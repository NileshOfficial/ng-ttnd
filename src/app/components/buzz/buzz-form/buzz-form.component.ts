import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { buzzForm } from '../buzz.form';
import { FormGroup } from '@angular/forms';
import { BuzzapiService } from 'src/app/services/apis/buzzapi.service';

@Component({
	selector: 'ttnd-buzz-form',
	templateUrl: './buzz-form.component.html',
	styleUrls: ['./buzz-form.component.css', '../../common.css']
})
export class BuzzFormComponent implements OnInit {
  @Input() autoFillData: any = {};
  @Output() emitFormSubmitData: any = new EventEmitter<any>();
  @Output() emitFormDiscard: any = new EventEmitter<any>();

	buzzForm: FormGroup = buzzForm;
	allowedFileType: Array<string> = ['image/png', 'image/jpeg'];
	uploadedFiles: Array<File> = [];

	invalidFile: boolean = false;
	postingBuzz: boolean = false;
	err: boolean = false;

	constructor(public api: BuzzapiService) {}

	ngOnInit(): void {}

	createBuzz() {
    if (this.buzzForm.valid && !this.invalidFile) {
			this.showLoader();
			const data = this.prepareDataToPost();
			this.api.postBuzz(data).subscribe(
				(data) => {
					this.buzzForm.reset({
						category: ''
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

  emitFormData() {
    this.emitFormData()
  }

	fileChange(event) {
		this.invalidFile = false;
		const files: Array<File> = event.target.files;
		if (files.length > 10) this.invalidFile = true;

		for (const file of files) {
			if (!this.allowedFileType.includes(file.type) || file.size > 5 * 1024 * 1024) {
				this.invalidFile = true;
				break;
			}
		}
		this.uploadedFiles = files;
	}

	prepareDataToPost(): FormData {
		const sharableFormData = new FormData();

		const formData = this.buzzForm.value;
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
		this.postingBuzz = true;
	}

	showErr(): void {
		this.postingBuzz = false;
		this.err = true;
	}

	hideLoader(): void {
		this.postingBuzz = false;
		this.err = false;
  }

  resetForm() {
    this.invalidFile = false;
    this.uploadedFiles = [];
  }
}
