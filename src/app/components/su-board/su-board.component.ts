import { Component, OnInit } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ttnd-su-board',
	templateUrl: './su-board.component.html',
	styleUrls: ['../common.css', './su-board.component.css']
})
export class SuBoardComponent implements OnInit {
	readonly department = DepartmentComponent;
	addDepartmentForm: FormGroup;

	constructor(public deptApi: DepartmentapiService) {}

	ngOnInit(): void {
		this.addDepartmentForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});
	}

	addNewDept() {
		if (this.addDepartmentForm.valid)
			this.deptApi.addDepartment(this.addDepartmentForm.value).subscribe(
				(data) => {
					console.log(data);
				},
				(err) => {
					console.log(err);
				}
			);
	}
}
