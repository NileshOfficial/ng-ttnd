import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDataService } from '../dataServices/auth.service';
import { BUZZ } from '../../config/uri.conf';

@Injectable({
	providedIn: 'root'
})
export class BuzzapiService {
	constructor(private http: HttpClient, private authData: LoginDataService) {}

	postBuzz(buzzData: any): Observable<any> {
		return this.http.post(BUZZ, buzzData);
	}
}
