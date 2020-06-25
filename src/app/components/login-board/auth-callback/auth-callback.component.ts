import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../../services/dataServices/auth.service';

@Component({
	selector: 'ttnd-auth-callback',
	templateUrl: './auth-callback.component.html',
	styleUrls: ['./auth-callback.component.css', '../../common.css']
})
export class AuthCallbackComponent implements OnInit {
	constructor(private logindata: LoginDataService) {}

	ngOnInit(): void {}
}
