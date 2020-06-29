import { Component, OnInit } from '@angular/core';
import { LoginDataService } from 'src/app/services/dataServices/auth.service';

@Component({
  selector: 'ttnd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../common.css']
})
export class NavComponent implements OnInit {

  userEmail: string = '';
  constructor(private authData: LoginDataService) {}

  ngOnInit(): void {
    this.userEmail = this.authData.idTokenData().email;
  }

}