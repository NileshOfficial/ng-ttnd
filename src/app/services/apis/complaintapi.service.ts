import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMPLAINT, COMPLAINT_RESOLVE } from '../../config/uri.conf';
import { Complaint } from 'src/app/models/complaint.model';

@Injectable({
	providedIn: 'root'
})
export class ComplaintapiService {
	constructor(private http: HttpClient) {}

	get(query: any = {}, skip: number = 0, limit: number = 0): Observable<Array<Complaint>> {
		const constructedQuery = {
			...query,
			...(skip && { skip: skip }),
			...(limit && { limit: limit })
		};
		const params = new HttpParams({ fromObject: constructedQuery });
		return this.http.get<Array<Complaint>>(COMPLAINT, { params: params });
	}

	updateComplaint(_id: string, update: any): Observable<any> {
		return this.http.patch([COMPLAINT, _id].join('/'), update);
	}

	postComplaint(data: any): Observable<{ inserted: boolean; referenceToken: string }> {
		return this.http.post<{ inserted: boolean; referenceToken: string }>(COMPLAINT, data);
	}

	deleteComplaint(_id: string): Observable<any> {
		return this.http.delete([COMPLAINT, _id].join('/'));
	}

	updateResolve(_id: string, update: any): Observable<any> {
		return this.http.patch([COMPLAINT_RESOLVE, _id].join('/'), update);
	}
}
