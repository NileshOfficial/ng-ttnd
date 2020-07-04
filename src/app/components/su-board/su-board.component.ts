import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfiniteScrollerComponent } from '../infiniteScroller/infiniteScroller.component';

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

	addNewDept(deptList: InfiniteScrollerComponent) {
		if (this.addDepartmentForm.valid)
			this.deptApi.addDepartment(this.addDepartmentForm.value).subscribe(
				(data) => {
          console.log(data);
          deptList.reload();
				},
				(err) => {
					console.log(err);
				}
			);
	}
}
