import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { User } from 'src/app/models/user.model';
import { PROFILE_PIC } from '../../config/uri.conf';

@Component({
	selector: 'ttnd-user',
	templateUrl: './user.component.html',
	styleUrls: ['../common.css', './user.component.css']
})
export class UserComponent implements OnInit {
	@Input() data: User = null;
	@Input() departmentList: Array<Department> = [];
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {
		console.log(this.data);
		this.data.picture = [PROFILE_PIC, this.data.picture].join('/');
	}
}
