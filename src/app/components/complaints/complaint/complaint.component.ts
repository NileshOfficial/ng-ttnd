import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { Complaint } from 'src/app/models/complaint.model';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { Department } from 'src/app/models/department.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ttnd-complaint',
	templateUrl: './complaint.component.html',
	styleUrls: ['./complaint.component.css', '../../common.css']
})
export class ComplaintComponent implements OnInit {
	@ViewChild('statusDropdown') statusDropdown: ElementRef;

	@Input() editableBy: string = 'user'; /* admin, user, view */
	@Input() data: Complaint = null;
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	estimatedTimeForm: FormGroup = null;
	departmentList: Array<Department> = [];
	currentStatus: string = '';

	showEditForm: boolean = false;
	showEstimatedTimeForm: boolean = false;
	updatingStatus: boolean = false;
	updatingStatusErr: boolean = false;

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

	verifySpanType(spanType: FormControl): { [k: string]: boolean } {
		const spanTypes = ['hours', 'days', 'weeks', 'months'];
		if (spanTypes.includes(spanType.value)) return null;
		else return { invalidSpanType: true };
	}

	editFormPopup() {
		this.showEditForm = true;
	}

	hideEditForm() {
		this.showEditForm = false;
	}

	estimatedTimePopup() {
		const defaultSpanValue: number = this.data.status === 'in progress' ? this.data.estimatedTime.value : null;
		const defaultSpanType: string = this.data.status === 'in progress' ? this.data.estimatedTime.spanType : '';

		this.estimatedTimeForm = new FormGroup({
			value: new FormControl(defaultSpanValue, [Validators.required, Validators.min(1)]),
			spanType: new FormControl(defaultSpanType, [Validators.required, this.verifySpanType.bind(this)])
		});

		this.showEstimatedTimeForm = true;
	}

	hideEstimatedTimePopup() {
		this.showEstimatedTimeForm = false;
	}

	deleteComplaint() {
		this.complaintApi.deleteComplaint(this.data._id).subscribe(
			(data) => {
				this.reload.emit(true);
			},
			(err) => console.log(err)
		);
	}

	discardStatusUpdate() {
		this.statusDropdown.nativeElement.value = this.data.status;
		this.hideEstimatedTimePopup();
	}

	statusChange(event: any) {
		const currentStatus = event.target.value;
		this.currentStatus = currentStatus;

		if (currentStatus === 'in progress') this.estimatedTimePopup();
		else if (currentStatus !== this.data.status) {
			this.updateStatus({
				status: this.currentStatus
			});
		}
	}

	updateEstimatedTime() {
		if (this.estimatedTimeForm.valid) {
			this.updatingStatus = true;
			const update = {
				status: this.currentStatus,
				estimatedTime: this.estimatedTimeForm.value
			};
			this.updateStatus(update);
		}
	}

	updateStatus(update: any) {
		this.complaintApi.updateResolve(this.data._id, update).subscribe(
			(data) => {
				this.hideEstimatedTimePopup();
				this.updatingStatus = false;

				const updatedData = this.data;
				updatedData.status = update.status;
				if (update.estimatedTime) updatedData.estimatedTime = update.estimatedTime;

				this.data = updatedData;
			},
			(err) => {
				this.updatingStatusErr = true;
				console.log(err);
			}
		);
	}
}
