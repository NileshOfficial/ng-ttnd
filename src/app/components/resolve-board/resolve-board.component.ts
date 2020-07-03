import { Component, OnInit } from '@angular/core';
import { ComplaintComponent } from '../complaints/complaint/complaint.component';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { Department } from 'src/app/models/department.model';

@Component({
	selector: 'ttnd-resolve-board',
	templateUrl: './resolve-board.component.html',
	styleUrls: ['../common.css', './resolve-board.component.css']
})
export class ResolveBoardComponent implements OnInit {
	readonly complaint = ComplaintComponent;
	complaintFilter: any = {};
	filtersForm: FormGroup = null;
	departments: Array<Department> = [];

	constructor(public complaintApi: ComplaintapiService, private deptService: DepartmentapiService) {}

	ngOnInit(): void {
		this.deptService.getDepartments().subscribe(
			(data) => (this.departments = data),
			(err) => console.log(err)
		);

		this.filtersForm = new FormGroup({
			issueId: new FormControl(null),
			department: new FormControl(''),
			status: new FormControl('')
		});
	}

	applyFilters() {
		this.complaintFilter = Object.entries(this.filtersForm.value).reduce(
			(a, [k, v]) => (v ? ((a[k] = v), a) : a),
			{}
		);
	}

	resetFilters() {
		this.complaintFilter = {};
	}
}
