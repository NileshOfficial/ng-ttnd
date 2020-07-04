import { Component, OnInit } from '@angular/core';
import { getBuzzForm } from './buzz.form';
import { FormGroup } from '@angular/forms';
import { BuzzapiService } from '../../services/apis/buzzapi.service';
import { BuzzPostComponent } from './buzzpost/buzzpost.component';
import { InfiniteScrollerComponent } from '../infiniteScroller/infiniteScroller.component';

@Component({
	selector: 'ttnd-buzz',
	templateUrl: './buzz.component.html',
	styleUrls: ['./buzz.component.css', '../common.css']
})
export class BuzzComponent implements OnInit {

	readonly buzzPostComponent = BuzzPostComponent;

	buzzForm: FormGroup = getBuzzForm();
	allowedFileType: Array<string> = ['image/png', 'image/jpeg'];
	uploadedFiles: Array<File> = [];
	categoryFilter: any = {};

	invalidFile: boolean = false;
	postingBuzz: boolean = false;
	err: boolean = false;

	constructor(public api: BuzzapiService) {}

	ngOnInit(): void {}

	createBuzz(buzzList: InfiniteScrollerComponent) {
		if (this.buzzForm.valid && !this.invalidFile) {
			this.showLoader()
			const data = this.prepareDataToPost();
			this.api.postBuzz(data).subscribe(
				(data) => {
					this.buzzForm.reset({
						category: ''
					});
					this.hideLoader();
					buzzList.reload();
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
		if (files.length > 10) this.invalidFile = true;

		for (const file of files) {
			if (!this.allowedFileType.includes(file.type) || file.size >= 5 * 1024 * 1024) {
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

	reset() {
		this.invalidFile = false;
		this.uploadedFiles = [];
	}

	applyCategoryFilter(event: any) {
		if(event.target.value)
			this.categoryFilter = {
				category: event.target.value
			};
		else this.categoryFilter = {};
	}
}
