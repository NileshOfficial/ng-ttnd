import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { Complaint } from 'src/app/models/complaint.model';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { Department } from 'src/app/models/department.model';

@Component({
	selector: 'ttnd-complaint',
	templateUrl: './complaint.component.html',
	styleUrls: ['./complaint.component.css', '../../common.css']
})
export class ComplaintComponent implements OnInit {
	@Input() editableBy: string = 'user'; /* admin, user, view */
	@Input() data: Complaint = null;
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	departmentList: Array<Department> = [];

	showEditForm: boolean = false;

	constructor(private complaintApi: ComplaintapiService, private deptApi: DepartmentapiService) {}

	ngOnInit(): void {
		this.deptApi.getDepartments().subscribe(
			(data) => {
				this.departmentList = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	editFormPopup() {
		this.showEditForm = true;
	}

	hideEditForm() {
		this.showEditForm = false;
	}

	deleteComplaint() {
		this.complaintApi.deleteComplaint(this.data._id).subscribe(
			(data) => {
				console.log(data);
				this.reload.emit(true);
			},
			(err) => console.log(err)
		);
	}
}
