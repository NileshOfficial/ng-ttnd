import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfiniteScrollerComponent } from '../infiniteScroller/infiniteScroller.component';
import { ComplaintComponent } from '../complaints/complaint/complaint.component';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';

@Component({
	selector: 'ttnd-su-board',
	templateUrl: './su-board.component.html',
	styleUrls: ['../common.css', './su-board.component.css']
})
export class SuBoardComponent implements OnInit {
	readonly department = DepartmentComponent;
	readonly complaint = ComplaintComponent;

	addDepartmentForm: FormGroup;

	complaintsFilter: any = {};
	complaintDataBindings: any = {};

	currentView: string = 'departments';

	constructor(public deptApi: DepartmentapiService, public complaintApi: ComplaintapiService) {}

	ngOnInit(): void {
		this.addDepartmentForm = new FormGroup({
			name: new FormControl('', [Validators.required])
		});

		this.complaintsFilter = {
			all: 1
		};

		this.complaintDataBindings = {
			editableBy: 'view'
		};
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

	changeView(view: string) {
		this.currentView = view;
	}

	getComplaintsFilter(event: any) {
		event.all = 1;
		this.complaintsFilter = event;
	}
}
