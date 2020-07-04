import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { User } from 'src/app/models/user.model';
import { PROFILE_PIC } from '../../config/uri.conf';
import { UserapiService } from 'src/app/services/apis/userapi.service';

@Component({
	selector: 'ttnd-user',
	templateUrl: './user.component.html',
	styleUrls: ['../common.css', './user.component.css']
})
export class UserComponent implements OnInit {
	@Input() data: User = null;
	@Input() departmentList: Array<Department> = [];
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	constructor(private userApi: UserapiService) {}

	ngOnInit(): void {
		this.data.picture = [PROFILE_PIC, this.data.picture].join('/');
	}

	updatePrivileges(key: string, event: any) {
		const value = event.target.value;
		this.userApi.updatePrivileges(this.data.email, { [key]: value }).subscribe(
			(data) => {},
			(err) => console.log(err)
		);
	}
}
