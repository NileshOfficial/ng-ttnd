import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';
import { BuzzapiService } from 'src/app/services/apis/buzzapi.service';
import { BuzzPostComponent } from '../buzz/buzzpost/buzzpost.component';

@Component({
	selector: 'ttnd-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.css', '../common.css']
})
export class ProfilePageComponent implements OnInit {
	readonly buzzPostComponent = BuzzPostComponent;
	editableProfile: boolean = false;
	userEmail: string = '';
	currentView: string = 'profile';
	buzzDataBindings: any = null;
	buzzFilter: any = {}

	constructor(private router: Router, private authData: LoginDataService, public buzzApi: BuzzapiService) {
		const userEmail = this.router.getCurrentNavigation().extras.state;
		if (userEmail) this.userEmail = userEmail.email;
		else router.navigate(['/home']);
	}

	ngOnInit(): void {
		const allowEditing = (this.userEmail === this.authData.idTokenData().email);
		this.editableProfile = allowEditing
		this.buzzDataBindings = {
			editable: allowEditing
		};
		this.buzzFilter = {
			email: this.userEmail
		}
	}

	showProfile(): void {
		this.currentView = 'profile';
	}

	showActivity(): void {
		this.currentView = 'activity';
	}
}
