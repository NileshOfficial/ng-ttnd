import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../../../models/department.model';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';

@Component({
	selector: 'ttnd-department',
	templateUrl: './department.component.html',
	styleUrls: ['../../common.css', './department.component.css']
})
export class DepartmentComponent implements OnInit {
	@ViewChild('dept') set content(content: ElementRef) {
		if (content) {
			content.nativeElement.value = this.data.name;
			content.nativeElement.focus();
		}
	}

	@Input() data: Department = null;
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	editingDept: boolean = false;

	confirmation: boolean = false;
	message: string = '';

	constructor(private deptApi: DepartmentapiService) {}

	ngOnInit(): void {}

	editDepartment() {
		this.editingDept = true;
	}

	hideEditInput() {
		this.editingDept = false;
	}

	deleteDept() {
		this.message = `Are you sure to delete department: ${this.data.name.toUpperCase()}`;
		this.confirmation = true;
	}

	updateDept(input: HTMLInputElement) {
		const name = input.value;
		this.deptApi.updateDepartment(this.data._id, { name }).subscribe(
			(data) => {
				const updatedData = this.data;
				updatedData.name = name;
				this.data = updatedData;
				this.hideEditInput();
			},
			(err) => {
				console.log(err);
			}
		);
	}

	proceed(event: any) {
		this.confirmation = false;
		if (event) {
			this.deptApi.deleteDeparment(this.data._id).subscribe(
				(data) => {
					console.log(data);
					this.reload.emit(true);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}
}
