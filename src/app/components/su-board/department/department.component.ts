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

	constructor(private deptApi: DepartmentapiService) {}

	ngOnInit(): void {}

	editDepartment() {
		this.editingDept = true;
	}

	hideEditInput() {
		this.editingDept = false;
	}

	deleteDept() {
		this.deptApi.deleteDeparment(this.data._id).subscribe(
			(data) => {
				this.reload.emit(true);
			},
			(err) => {
				console.log(err);
			}
		);
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
}
