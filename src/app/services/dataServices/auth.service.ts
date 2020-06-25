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
	private mode: string = null;
	private token: LoginToken = null;

	get loginMode(): string {
		return this.mode;
	}

	set loginMode(mode: string) {
		this.loginMode = mode;
	}

	get loginToken(): LoginToken {
		if (!this.token) this.token = retrieveToken();
		return this.token;
	}

	set loginToken(token: LoginToken) {
    this.token = token;
    storeToken(this.token);
  }

  delete(): void {
    this.token = null;
    deleteToken();
  }
}
