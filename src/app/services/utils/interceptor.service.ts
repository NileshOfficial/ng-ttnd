import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpHeaders } from '@angular/common/http';
import { LoginDataService } from '../dataServices/auth.service';

@Injectable()
export class RequestHeaderService implements HttpInterceptor {
	constructor(private authData: LoginDataService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const urlSegments = this.parseUrl(req.url);
		let newRequest = req;

		if (urlSegments[0] === 'auth' && urlSegments[1] === 'validate') {
			newRequest = req.clone({
				headers: this.newHeader()
			});
		} else if (urlSegments[0] !== 'auth' && urlSegments[0] !== 'admin') {
			newRequest = req.clone({
				headers: this.newHeader()
			});
		}
		return next.handle(newRequest);
	}

	newHeader(): HttpHeaders {
		const token = this.authData.loginToken;
		return new HttpHeaders({
			authorization: `bearer ${token.access_token},bearer ${token.id_token}`
		});
	}

	parseUrl(url: string): Array<string> {
		const routePaths = url.split('/').slice(3);
		const endpoint = routePaths.pop().split('?');
		routePaths.push(endpoint[0]);
		return routePaths;
	}
}
