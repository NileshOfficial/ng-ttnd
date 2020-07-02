import { Department } from './department.model';

interface UserDetails {
	name: string;
	email: string;
}

export interface Complaint {
	_id: string;
	assignedTo: UserDetails;
	department: Department;
	description: string;
	estimatedTime: {
		spanType: string;
		value: number;
	};
	files: Array<string>;
	issueId: string;
    lockedBy: UserDetails;
    status: string;
    timestamp: number;
    title: string;
}
