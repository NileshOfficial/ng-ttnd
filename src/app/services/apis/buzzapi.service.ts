import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDataService } from '../dataServices/auth.service';
import { BUZZ, UPDATE_LIKE, UPDATE_DISLIKE } from '../../config/uri.conf';

@Injectable({
	providedIn: 'root'
})
export class BuzzapiService {
	constructor(private http: HttpClient, private authData: LoginDataService) {}

	postBuzz(buzzData: any): Observable<any> {
		return this.http.post(BUZZ, buzzData);
	}

	get(query: any = {}, skip: number = 0, limit: number = 0): Observable<any> {
		const constructedQuery = {
			...query,
			...(skip && { skip: skip }),
			...(limit && { limit: limit })
		};
		const params = new HttpParams({ fromObject: constructedQuery });
		return this.http.get(BUZZ, { params: params });
	}

	updateReview(docId: string, reverse: boolean, type: string = 'like'): Observable<any> {
		const uri =
			type === 'like'
				? `${UPDATE_LIKE}/${docId}${reverse ? '?reverse=1' : ''}`
				: `${UPDATE_DISLIKE}/${docId}${reverse ? '?reverse=1' : ''}`;
		return this.http.patch(uri, {});
	}

	updateBuzz(_id: string, update: any): Observable<any> {
		return this.http.patch([BUZZ, _id].join('/'), update);
	}
}
