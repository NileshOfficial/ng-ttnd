import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEPARTMENT } from '../../config/uri.conf';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentapiService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Array<Department>> {
    return this.http.get<Array<Department>>(DEPARTMENT);
  }
}
