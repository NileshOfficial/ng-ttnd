import { Component, OnInit } from '@angular/core';
import { ComplaintComponent } from '../complaints/complaint/complaint.component';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';

@Component({
	selector: 'ttnd-resolve-board',
	templateUrl: './resolve-board.component.html',
	styleUrls: ['../common.css', './resolve-board.component.css']
})
export class ResolveBoardComponent implements OnInit {
	readonly complaint = ComplaintComponent;
	complaintFilter: any = {};

  constructor(public complaintApi: ComplaintapiService) {}

  ngOnInit(): void {
  }

  getFilterData(event: any) {
    this.complaintFilter = event;
  }
}
