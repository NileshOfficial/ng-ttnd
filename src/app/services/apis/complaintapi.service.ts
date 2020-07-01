import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMPLAINT } from '../../config/uri.conf';

@Injectable({
	providedIn: 'root'
})
export class ComplaintapiService {
	constructor(private http: HttpClient) {}

	postComplaint(data: any): Observable<{ inserted: boolean, referenceToken: string }> {
    return this.http.post<{ inserted: boolean, referenceToken: string }>(COMPLAINT, data);
  }
}
