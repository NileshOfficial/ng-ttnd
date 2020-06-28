import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';
import { UserProfile } from '../../models/token.model';

@Component({
	selector: 'ttnd-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css', '../common.css']
})
export class ProfileComponent implements OnInit {
	editProfileForm: FormGroup;

	editProfile: boolean = false;
	loggedInUserProfile: UserProfile = null;

	constructor(private authData: LoginDataService) {}

	ngOnInit(): void {
    const token = this.authData.loginToken.id_token;
    console.log(token.split('.'));
		const decoded = JSON.parse(atob(token.split('.')[1]));
		this.loggedInUserProfile = decoded;

    this.editProfileForm = new FormGroup({
			name: new FormControl(this.loggedInUserProfile.name || ''),
			contact: new FormControl(this.loggedInUserProfile.contact || ''),
			dob: new FormControl(/**this.loggedInUserProfile.dob**/ new Date().toISOString().substring(0, 10) || '')
		});
	}

	openEditForm(): void {
		this.editProfile = true;
	}

	closeEditForm(): void {
		this.editProfile = false;
  }

  log(stat: any) {
    console.log(stat);
  }
}
