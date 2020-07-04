import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../../../models/department.model';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';

@Component({
	selector: 'ttnd-department',
	templateUrl: './department.component.html',
	styleUrls: ['../../common.css', './department.component.css']
})
export class DepartmentComponent implements OnInit {
	deparmentEditInput: ElementRef;

	@ViewChild('dept') set content(content: ElementRef) {
		if (content) {
      this.deparmentEditInput = content;
      this.deparmentEditInput.nativeElement.focus();
			this.deparmentEditInput.nativeElement.value = this.data.name;
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
}
