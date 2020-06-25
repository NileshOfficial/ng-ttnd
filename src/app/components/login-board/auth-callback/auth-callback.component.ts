import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../../../services/dataServices/auth.service';
import { AuthapiService } from 'src/app/services/apis/authapi.service';
import { SIGN_IN as SIGN_IN_MODE, SIGN_UP as SIGN_UP_MODE } from '../../../config/login.conf';
import { SIGN_IN, SIGN_UP } from '../../../config/uri.conf';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ttnd-auth-callback',
	templateUrl: './auth-callback.component.html',
	styleUrls: ['./auth-callback.component.css', '../../common.css']
})
export class AuthCallbackComponent implements OnInit {
	constructor(
		private authApi: AuthapiService,
		private logindata: LoginDataService,
		private router: Router,
		private currentRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		const grantCode = this.currentRoute.snapshot.queryParams['code'];
		const loginMode = this.logindata.loginMode;
		this.logindata.deleteLoginMode();
		let authEndpoint: string = null;

		switch (loginMode) {
			case SIGN_IN_MODE: {
				console.log('in');
				authEndpoint = SIGN_IN;
				break;
			}
			case SIGN_UP_MODE: {
				console.log('up');
				authEndpoint = SIGN_UP;
				break;
			}
			default: {
				this.router.navigate(['/']);
				return;
			}
		}

		this.authApi.getAuthToken(authEndpoint, grantCode).subscribe(
			(data) => {
				this.logindata.loginToken = data;
				this.router.navigate(['/', 'home']);
			},
			(err) => {
				console.log(err, err.error);
				this.router.navigate(['/'], {
					state: {
						errorCode: err.error.errorCode,
						message: err.error.message
					}
				});
			}
		);
	}
}
