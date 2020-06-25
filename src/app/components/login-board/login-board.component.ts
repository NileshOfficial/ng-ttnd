import { Component, OnInit } from '@angular/core';
import * as config from '../../config/login.conf';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ttnd-login-board',
  templateUrl: './login-board.component.html',
  styleUrls: ['./login-board.component.css']
})
export class LoginBoardComponent implements OnInit {

  authenticationUri: string = '#';

  constructor() { }

  ngOnInit(): void {
    const authConfig = {
      client_id: config.CLIENT_ID,
      redirect_uri: config.REDIRECT_URI,
      scope: config.SCOPE.join(' '),
      response_type: config.RESPONSE_TYPE,
      access_type: config.ACCESS_TYPE,
      prompt: config.PROMPT
    }

    this.authenticationUri = [
      config.OAUTH_GRANT_CODE_URI,
      new HttpParams({fromObject: authConfig}).toString()
    ].join('?');
  }

}
