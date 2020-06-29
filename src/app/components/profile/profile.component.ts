import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';
import { UserProfile } from '../../models/token.model';
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

	editProfileForm: FormGroup;
	userProfile: User = null;

	editProfile: boolean = false;
	allowEditProfile: boolean = false;

	constructor(private authData: LoginDataService, private userApi: UserapiService, private router: Router) {
		const routerStateData = this.router.getCurrentNavigation().extras.state;

		if (routerStateData) {
			this.userEmail = routerStateData.email;
		}
	}

	ngOnInit(): void {
		const token = this.authData.loginToken.id_token;
		const decoded = JSON.parse(atob(token.split('.')[1]));
		this.loggedInUserProfile = decoded;

		if(this.userEmail === this.loggedInUserProfile.email)
			this.allowEditProfile = true;

		this.userApi.getUsers({ email: this.userEmail }).subscribe(data => {
			this.userProfile = data[0];
			this.userProfile.picture = [PROFILE_PIC, this.userProfile.picture].join('/');
			console.log(this.userProfile);
		}, err => {
			console.log(err);
		});
	}

	openEditForm(): void {
		this.editProfileForm = new FormGroup({
			name: new FormControl(this.loggedInUserProfile.name || ''),
			contact: new FormControl(this.loggedInUserProfile.contact || ''),
			dob: new FormControl(/**this.loggedInUserProfile.dob**/ new Date().toISOString().substring(0, 10) || '')
		});

		this.editProfile = true;
	}

	closeEditForm(): void {
		this.editProfileForm.reset();
		this.editProfile = false;
	}

	log(stat: any) {
		console.log(stat);
	}
}
