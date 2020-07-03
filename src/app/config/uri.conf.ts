const SERVER_DOMAIN: string = 'http://localhost:3001';

const getEndpoint = (path: string): string => [SERVER_DOMAIN, path].join('/');

export const SIGN_UP: string = getEndpoint('auth/signup');
export const SIGN_IN: string = getEndpoint('auth/signin');

export const BUZZ: string = getEndpoint('buzz');
export const BUZZ_POST: string = getEndpoint('post');
export const UPDATE_LIKE: string = getEndpoint('buzz/like');
export const UPDATE_DISLIKE: string = getEndpoint('buzz/dislike');

export const USER: string = getEndpoint('user');
export const USER_PICTURE: string = getEndpoint('user/picture');
export const PROFILE_PIC: string = getEndpoint('profile');

export const DEPARTMENT: string = getEndpoint('department');

export const COMPLAINT: string = getEndpoint('complaints');
export const COMPLAINT_RESOLVE: string = getEndpoint('complaints/resolve');