import { Injectable } from '@angular/core';
import { LoginToken } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  private mode: string = null;
  private token: LoginToken = null;

  get loginMode(): string {
    return this.mode;
  }

  set loginMode(mode: string) {
    this.loginMode = mode;
  }

  get loginToken(): LoginToken {
    return this.token;
  }

  set loginToken(token: LoginToken) {
    this.token = token;
  }

}

@Injectable({
  providedIn: 'root'
})
export class LocalStoreInterface {
  storeToken(token: LoginToken): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  retrieveToken(): LoginToken | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  deleteToken(): void {
    localStorage.clear();
  }
}