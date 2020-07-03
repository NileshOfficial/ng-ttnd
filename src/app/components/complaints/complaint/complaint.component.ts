import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { Complaint } from 'src/app/models/complaint.model';

@Component({
	selector: 'ttnd-complaint',
	templateUrl: './complaint.component.html',
	styleUrls: ['./complaint.component.css', '../../common.css']
})
export class ComplaintComponent implements OnInit {
	@Input() editableBy: string = 'user'; /* admin, user, view */
	@Input() data: Complaint = null;
	@Output() reload: EventEmitter<boolean> = new EventEmitter();

	constructor(private complaintApi: ComplaintapiService) {}

	ngOnInit(): void {}

	deleteComplaint() {
		this.complaintApi.deleteComplaint(this.data._id).subscribe(
			(data) => {
				console.log(data);
				this.reload.emit(true);
			},
			(err) => console.log(err)
		);
	}
}
