import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';
import { UserProfile, LoginToken } from '../../models/token.model';
import { UserapiService } from 'src/app/services/apis/userapi.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PROFILE_PIC } from '../../config/uri.conf';

@Component({
	selector: 'ttnd-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css', '../common.css']
})
export class ProfileComponent implements OnInit {
	private loggedInUserProfile: UserProfile = null;
	private userEmail: string = 'nilesh22.a67@gmail.com';

	allowedFileType: Array<string> = ['image/png', 'image/jpeg'];
	editProfileForm: FormGroup;
	userProfile: User = null;

	editProfile: boolean = false;
	allowEditProfile: boolean = false;
	pictureError: boolean = false;
	pictureErrorMsg: string = '';
	updatingProfile: boolean = false;
	profileError: boolean = false;
	profileErrorMsg: string = '';
	dateLimit: string = new Date().toISOString().substring(0, 10);

	constructor(private authData: LoginDataService, private userApi: UserapiService, private router: Router) {
		const routerStateData = this.router.getCurrentNavigation().extras.state;

		if (routerStateData) {
			this.userEmail = routerStateData.email;
		}
	}

	ngOnInit(): void {
		this.loggedInUserProfile = this.getUserProfileFromToken(this.authData.loginToken.id_token);
		if (this.userEmail === this.loggedInUserProfile.email) this.allowEditProfile = true;
		this.fetchProfile();
	}

	fetchProfile(): void {
		this.userProfile = null;
		this.userApi.getUsers({ email: this.userEmail }).subscribe(
			(data) => {
				this.userProfile = data[0];
				this.userProfile.picture = [PROFILE_PIC, this.userProfile.picture].join('/');
			},
			(err) => {
				console.log(err);
			}
		);
	}

	openEditForm(): void {
		this.editProfileForm = new FormGroup({
			name: new FormControl(this.loggedInUserProfile.name || ''),
			contact: new FormControl(this.loggedInUserProfile.contact || ''),
			dob: new FormControl(this.loggedInUserProfile.dob || '')
		});

		this.editProfile = true;
	}

	submitProfileUpdate() {
		this.profileError = false;
		if(this.editProfileForm.valid) {
			this.updatingProfile = true;
			const update = this.editProfileForm.value;
			if(!update.name)
				delete update.name;
			this.userApi.updateProfile(update).subscribe(
				data => {
					this.updatingProfile = false;
					const token: LoginToken = this.authData.loginToken;
					token.id_token = data.id_token;
					this.authData.loginToken = token;
					console.log(token);
					this.closeEditForm();
					this.fetchProfile();
				},
				err => {
					console.log(err.error);
					this.updatingProfile = false;
					this.profileError = true;
					this.profileErrorMsg = err.error.message;
				}
			)
		}
	}

	closeEditForm(): void {
		this.editProfileForm.reset();
		this.editProfile = false;
	}

	uploadPic(event: any): void {
		this.pictureError = false;
		const file: File = event.target.files[0];
		const pictureData = new FormData();
		if (this.allowedFileType.includes(file.type) && file.size <= 5 * 1024 * 1024) {
			pictureData.append('file', file);
			this.userApi.updatePicture(pictureData).subscribe(
				(data) => {
					const token: LoginToken = this.authData.loginToken;
					token.id_token = data.id_token;
					this.authData.loginToken = token;
					this.fetchProfile();
				},
				(err) => {
					this.pictureError = true;
					this.pictureErrorMsg = err.message;
				}
			);
		} else {
			this.pictureError = true;
		}
	}

	getUserProfileFromToken(idToken: string): UserProfile {
		return JSON.parse(atob(idToken.split('.')[1]));
	}
}
