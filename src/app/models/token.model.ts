export interface LoginToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
}

export interface UserProfile {
    role: string;
    id: string;
    name: string;
    email: string;
    picture: string;
    department: string;
    role_code: string;
    contact: string,
    dob: string;
}