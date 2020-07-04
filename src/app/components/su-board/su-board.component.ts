import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfiniteScrollerComponent } from '../infiniteScroller/infiniteScroller.component';
import { ComplaintComponent } from '../complaints/complaint/complaint.component';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { UserComponent } from '../user/user.component';
import { UserapiService } from '../../services/apis/userapi.service';
import { Department } from 'src/app/models/department.model';

@Component({
	selector: 'ttnd-su-board',
	templateUrl: './su-board.component.html',
	styleUrls: ['../common.css', './su-board.component.css']
})
export class SuBoardComponent implements OnInit {
	readonly department = DepartmentComponent;
	readonly complaint = ComplaintComponent;
	readonly user = UserComponent;

	addDepartmentForm: FormGroup;

	complaintsFilter: any = {};
	complaintDataBindings: any = {};

	userDataBindings: any = {};
	userFiltersForm: FormGroup = null;
	userFilters: any = { department: 'notAssigned' };

	currentView: string = 'users';
	departmentList: Array<Department> = [];

	constructor(
		public deptApi: DepartmentapiService,
		public complaintApi: ComplaintapiService,
		public userApi: UserapiService
	) {}

	ngOnInit(): void {
		this.deptApi.getDepartments().subscribe(
			(data) => {
				this.departmentList = data;
				this.userDataBindings = {
					departmentList: data
				};
			},
			(err) => console.log(err)
		);

		this.userFiltersForm = new FormGroup({
			department: new FormControl('notAssigned'),
			role: new FormControl('')
		});

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

	applyUserFilters() {
		const filters = Object.entries(this.userFiltersForm.value).reduce(
			(a, [k, v]) => (v ? ((a[k] = v), a) : a),
			{}
		);
		this.userFilters = filters;
	}

	resetUserFilters() {
		this.userFilters = {};
	}
}
