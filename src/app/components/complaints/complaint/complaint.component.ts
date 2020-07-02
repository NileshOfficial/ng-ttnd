import { Component, OnInit, Input } from '@angular/core';
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

	constructor(private complaintApi: ComplaintapiService) {}

	ngOnInit(): void {
		this.complaintApi.get().subscribe(
			(data) => {
				console.log(data);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
