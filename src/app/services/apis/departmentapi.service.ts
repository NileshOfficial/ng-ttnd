import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DEPARTMENT } from '../../config/uri.conf';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
	providedIn: 'root'
})
export class DepartmentapiService {
	constructor(private http: HttpClient) {}

	getDepartments(query: any = {}, skip: number = 0, limit: number = 0): Observable<Array<Department>> {
		const constructedQuery = {
			...query,
			...(skip && { skip: skip }),
			...(limit && { limit: limit })
		};
		const params = new HttpParams({ fromObject: constructedQuery });
		return this.http.get<Array<Department>>(DEPARTMENT, { params: params });
	}
}
