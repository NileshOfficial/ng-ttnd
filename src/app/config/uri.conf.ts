const SERVER_DOMAIN: string = 'http://localhost:3001';

const getEndpoint = (path: string): string => [SERVER_DOMAIN, path].join();

export const SIGN_UP: string = getEndpoint('auth/singup');
export const SIGN_IN: string = getEndpoint('auth/signin');
