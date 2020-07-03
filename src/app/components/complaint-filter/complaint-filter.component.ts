import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { Department } from 'src/app/models/department.model';

@Component({
	selector: 'ttnd-complaint-filter',
	templateUrl: './complaint-filter.component.html',
	styleUrls: ['../common.css', './complaint-filter.component.css']
})
export class ComplaintFilterComponent implements OnInit {
	@Output() filterData: EventEmitter<any> = new EventEmitter();

	filtersForm: FormGroup = null;
	departments: Array<Department> = [];

	constructor(private deptService: DepartmentapiService) {}

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
		const complaintFilter = Object.entries(this.filtersForm.value).reduce(
			(a, [k, v]) => (v ? ((a[k] = v), a) : a),
			{}
		);
		this.filterData.emit(complaintFilter);
	}

	resetFilters() {
		this.filterData.emit({});
	}
}
