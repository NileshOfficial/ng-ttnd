import { Injectable } from '@angular/core';
import { LoginToken } from '../../models/token.model';

const storeToken = (token: LoginToken): void => {
	localStorage.setItem('token', JSON.stringify(token));
};

const retrieveToken = (): LoginToken | null => {
	const token = localStorage.getItem('token');
	return token ? JSON.parse(token) : null;
};

const deleteToken = (): void => {
	localStorage.clear();
};

@Injectable({
	providedIn: 'root'
})
export class LoginDataService {
	private token: LoginToken = null;

	constructor() {}

	get loginMode(): string {
		return localStorage.getItem('mode');
	}

	set loginMode(mode: string) {
		localStorage.setItem('mode', mode);
	}

	get loginToken(): LoginToken {
		if (!this.token) this.token = retrieveToken();
		return this.token;
	}

	set loginToken(token: LoginToken) {
    this.token = token;
    storeToken(this.token);
  }

  deleteToken(): void {
    this.token = null;
    deleteToken();
  }

  deleteLoginMode() {
	  localStorage.removeItem('mode');
  }
}
