import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { UserapiService } from 'src/app/services/apis/userapi.service';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'ttnd-user',
	templateUrl: './user.component.html',
	styleUrls: ['../common.css', './user.component.css']
})
export class UserComponent implements OnInit {
	data: User = null;
  departmentList: Array<Department> = [];

	constructor() {}

	ngOnInit(): void {
	}
}
