import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginToken } from '../../models/token.model';
import { Observable } from 'rxjs';
import { LoginDataService } from '../dataServices/auth.service';
import { VALIDATE } from 'src/app/config/uri.conf';

@Injectable({
	providedIn: 'root'
})
export class AuthapiService {
	constructor(private http: HttpClient) {}

	getAuthToken(route: string, code: string): Observable<LoginToken> {
		const endpoint = [route, encodeURIComponent(code)].join('/');
		return this.http.get<LoginToken>(endpoint);
	}

	validateAuthToken(): Observable<{ valid: boolean }> {
		return this.http.get<{ valid: boolean }>(VALIDATE);
	}
}
