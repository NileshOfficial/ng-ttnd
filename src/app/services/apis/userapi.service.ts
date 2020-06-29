import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER, USER_PICTURE } from '../../config/uri.conf';
import { User } from 'src/app/models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserapiService {
	constructor(private http: HttpClient) {}

	getUsers(query: any = {}, skip: number = 0, limit: number = 0): Observable<User> {
		const constructedQuery = {
			...query,
			...(skip && { skip: skip }),
			...(limit && { limit: limit })
		};

		const params = new HttpParams({ fromObject: constructedQuery });
		return this.http.get<User>(USER, { params: params });
	}

	updatePicture(picture: FormData): Observable<{ id_token: string }> {
		return this.http.patch<{ id_token: string }>(USER_PICTURE, picture);
	}

	updateProfile(profileData: any): Observable<{ id_token: string }> {
		return this.http.patch<{ id_token: string }>(USER, profileData);
	}
}
