import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginDataService } from '../services/dataServices/auth.service';
import { map, catchError } from 'rxjs/operators';
import { AuthapiService } from '../services/apis/authapi.service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DirectRouteAccessGuard implements CanActivate {
	constructor(private loginData: LoginDataService, private authApi: AuthapiService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.loginData.loginToken;
		if (!token) {
			this.router.navigate(['/']);
			return false;
		}
		return this.authApi.validateAuthToken().pipe(
			map((res) => res.valid),
			catchError((err) => {
				this.router.navigate(['/']);
				return of(false);
			})
		);
	}
}

@Injectable({
	providedIn: 'root'
})
export class VerifyRole implements CanActivate {
	constructor(private loginData: LoginDataService, private router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.loginData.loginToken;
		if (!token) {
			this.router.navigate(['/']);
			return false;
		}

		const userProfile = this.loginData.idTokenData();
		if (route.data.role >= userProfile.role_code) return true;
		this.router.navigate(['/home']);
		return false;
	}
}

@Injectable({
	providedIn: 'root'
})
export class GrantCodeCheckGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (router.queryParams.code) return true;
		else {
			this.router.navigate(['/']);
			return false;
		}
	}
}
