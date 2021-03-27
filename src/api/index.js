const BASE_URL = 'https://api.github.com';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = (userName = '') => fetch(`${BASE_URL}/users${userName}`);
export const getRepos = (userName = '') => fetch(`${BASE_URL}/users${userName}/repos`);
