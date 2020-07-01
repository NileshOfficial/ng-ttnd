import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BuzzapiService } from 'src/app/services/apis/buzzapi.service';

@Component({
	selector: 'ttnd-edit-buzz',
	templateUrl: './edit-buzz.component.html',
	styleUrls: ['./edit-buzz.component.css', '../../common.css']
})
export class EditBuzzComponent implements OnInit {
	@Input() populate: any = {};
	@Output() close: EventEmitter<boolean> = new EventEmitter();

	buzzForm: FormGroup;
	allowedFileType: Array<string> = ['image/png', 'image/jpeg'];
	uploadedFiles: Array<File> = [];

	invalidFile: boolean = false;
	postingBuzz: boolean = false;
	err: boolean = false;

	constructor(private api: BuzzapiService) {}

	ngOnInit(): void {
		this.buzzForm = new FormGroup({
			category: new FormControl(this.populate.category || '', [this.verifyCategory.bind(this)]),
			description: new FormControl(this.populate.description || null),
			title: new FormControl(this.populate.title || null)
		});
	}

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
		this.close.emit(false);
	}

	verifyCategory(category: FormControl): { [k: string]: boolean } {
		const categories = ['activity', 'lost and found'];
		if (categories.includes(category.value)) return null;
		else return { invalidCategory: true };
	}
}
