import { Component, OnInit } from '@angular/core';
import { buzzForm } from './buzz.form';
import { FormGroup } from '@angular/forms';
import { BuzzapiService } from '../../services/apis/buzzapi.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
	selector: 'ttnd-buzz',
	templateUrl: './buzz.component.html',
	styleUrls: ['./buzz.component.css', '../common.css']
})
export class BuzzComponent implements OnInit {
	buzzForm: FormGroup = buzzForm;
	allowedFileType: Array<string> = ['image/png', 'image/jpeg'];
	invalidFile: boolean = false;

	uploadedFiles: Array<File> = [];

	constructor(private api: BuzzapiService) {}

	ngOnInit(): void {}

	createBuzz() {
		if (this.buzzForm.valid) {
			const data = this.prepareDataToPost();
			this.api.postBuzz(data).subscribe(
				(data) => {
					this.buzzForm.reset({
						category: ''
					});
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	fileChange(event) {
		this.invalidFile = false;
		const files: Array<File> = event.target.files;
		if (files.length > 10) this.invalidFile = true;

		for (const file of files) {
			if (!this.allowedFileType.includes(file.type)) {
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
}
