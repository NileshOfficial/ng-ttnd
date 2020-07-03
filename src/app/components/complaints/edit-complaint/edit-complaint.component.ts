import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { Complaint } from 'src/app/models/complaint.model';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';

@Component({
	selector: 'ttnd-edit-complaint',
	templateUrl: './edit-complaint.component.html',
	styleUrls: ['./edit-complaint.component.css', '../../common.css']
})
export class EditComplaintComponent implements OnInit {
	@Input() complaintData: Complaint = null;
	@Input() departmentList: Array<Department> = [];
	@Output() close: EventEmitter<boolean> = new EventEmitter();

	complaintForm: FormGroup = null;
	allowedFileTypes: Array<string> = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf'];
	uploadedFiles: Array<File> = [];

	invalidFile: boolean = false;
	postingComplaint: boolean = false;
	err: boolean = false;

	constructor(public complaintApi: ComplaintapiService) {}

	ngOnInit(): void {
		const deptId = this.complaintData.department._id;
		this.complaintForm = new FormGroup({
			department: new FormControl(deptId, [Validators.required]),
			title: new FormControl(this.complaintData.title, [Validators.required]),
			description: new FormControl(this.complaintData.description, [Validators.required])
		});
	}

	createComplaint() {
		if (this.complaintForm.valid && !this.invalidFile) {
			this.showLoader();
			const data = this.prepareDataToPost();
			this.complaintApi.updateComplaint(this.complaintData._id, data).subscribe(
				(data) => {
					this.complaintForm.reset({
						department: '',
						title: ''
					});
					this.hideLoader();
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
		this.close.emit(true);
	}

	reset() {
		this.invalidFile = false;
		this.uploadedFiles = [];
		this.close.emit(true);
	}
}
