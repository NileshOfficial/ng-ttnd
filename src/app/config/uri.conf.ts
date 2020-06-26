const SERVER_DOMAIN: string = 'http://localhost:3001';

const getEndpoint = (path: string): string => [SERVER_DOMAIN, path].join('/');

export const SIGN_UP: string = getEndpoint('auth/signup');
export const SIGN_IN: string = getEndpoint('auth/signin');
export const BUZZ: string = getEndpoint('buzz');