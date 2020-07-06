import { Component, OnInit } from '@angular/core';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';

@Component({
	selector: 'ttnd-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css', '../common.css']
})
export class NavComponent implements OnInit {
	userEmail: string = '';
	roleCode: number = null;
	constructor(private authData: LoginDataService) {}

	ngOnInit(): void {
    const idTokenData = this.authData.idTokenData();
    console.log(idTokenData.role_code)
		this.userEmail = idTokenData.email;
		this.roleCode = idTokenData.role_code;
	}
}
