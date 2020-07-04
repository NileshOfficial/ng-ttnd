import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';
import { Department } from 'src/app/models/department.model';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { ComplaintComponent } from './complaint/complaint.component';
import { InfiniteScrollerComponent } from '../infiniteScroller/infiniteScroller.component';

@Component({
	selector: 'ttnd-complaints',
	templateUrl: './complaints.component.html',
	styleUrls: ['../common.css', './complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
	readonly complaint = ComplaintComponent;
	complaintForm: FormGroup = null;
	departmentList: Array<Department> = [];
	allowedFileTypes: Array<string> = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf'];
	uploadedFiles: Array<File> = [];
	complaintsFilter: any = {};

	invalidFile: boolean = false;
	postingComplaint: boolean = false;
	err: boolean = false;

	complaintLogged: boolean = false;
	referalId: string = '';

	constructor(public complaintApi: ComplaintapiService, private deptApi: DepartmentapiService) {}

	ngOnInit(): void {
		this.deptApi.getDepartments().subscribe(
			(data) => {
				this.departmentList = data;
			},
			(err) => {
				console.log(err);
			}
		);

		this.complaintForm = new FormGroup({
			department: new FormControl('', [Validators.required]),
			title: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required])
		});
	}

	createComplaint(complaintList: InfiniteScrollerComponent) {
		if (this.complaintForm.valid && !this.invalidFile) {
			this.showLoader();
			const data = this.prepareDataToPost();
			this.complaintApi.postComplaint(data).subscribe(
				(data) => {
					console.log(data);
					this.complaintForm.reset({
						department: '',
						title: ''
					});
					this.referalId = data.referenceToken;
					this.hideLoader();
					complaintList.reload();
				},
				(err) => {
					console.log(err);
					this.showErr();
				}
			);
		}
	}

	fileChange(event) {
		this.invalidFile = false;
		const files: Array<File> = event.target.files;
		if (files.length > 5) this.invalidFile = true;

		for (const file of files) {
			if (!this.allowedFileTypes.includes(file.type) || file.size >= 5 * 1024 * 1024) {
				this.invalidFile = true;
				break;
			}
		}
		this.uploadedFiles = files;
	}

	prepareDataToPost(): FormData {
		const sharableFormData = new FormData();

		const formData = this.complaintForm.value;
		const fields = Object.entries(formData);

		for (const field of fields) {
			if (field[1]) {
				sharableFormData.append(field[0], field[1] as string);
			}
		}

		if (this.uploadedFiles.length > 0)
			for (const file of this.uploadedFiles) sharableFormData.append('files', file, file.name);

		return sharableFormData;
	}

	showLoader(): void {
		this.postingComplaint = true;
	}

	showErr(): void {
		this.postingComplaint = false;
		this.err = true;
	}

	hideLoader(): void {
		this.postingComplaint = false;
		this.err = false;
		this.complaintLogged = true;
	}

	reset() {
		this.invalidFile = false;
		this.uploadedFiles = [];
	}

	getFilterData(event: any) {
		this.complaintsFilter = event;
	}
}
