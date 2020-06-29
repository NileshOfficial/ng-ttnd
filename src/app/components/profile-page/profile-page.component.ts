import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';

@Component({
	selector: 'ttnd-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.css', '../common.css']
})
export class ProfilePageComponent implements OnInit {
	editableProfile: boolean = false;
	userEmail: string = '';
	currentView: string = 'profile';

	constructor(private router: Router, private authData: LoginDataService) {
		const userEmail = this.router.getCurrentNavigation().extras.state;
		if (userEmail) this.userEmail = userEmail.email;
		else router.navigate(['/home']);
	}

	ngOnInit(): void {
		this.editableProfile = (this.userEmail === this.authData.idTokenData().email);
	}

	showProfile(): void {
		this.currentView = 'profile';
	}

	showActivity(): void {
		this.currentView = 'activity';
	}
}
