import { Component, OnInit } from '@angular/core';
import { ComplaintComponent } from '../complaints/complaint/complaint.component';
import { ComplaintapiService } from 'src/app/services/apis/complaintapi.service';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';

@Component({
  selector: 'ttnd-resolve-board',
  templateUrl: './resolve-board.component.html',
  styleUrls: ['./resolve-board.component.css']
})
export class ResolveBoardComponent implements OnInit {
  readonly complaint = ComplaintComponent;
  complaintFetchFilter: any = {};

  constructor(public complaintApi: ComplaintapiService, private authData: LoginDataService) { }

  ngOnInit(): void {
    const userProfile = this.authData.idTokenData();

    this.complaintFetchFilter = {
      email: userProfile.email
    }
  }

}
