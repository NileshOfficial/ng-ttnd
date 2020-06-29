export interface User {
	_id: string;
	email: string;
	name: string;
	picture: string;
	role: string;
	department: {
		_id: string;
		name: string;
	};
	contact: string;
	dob: string;
}
