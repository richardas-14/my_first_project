import axios from 'axios';

export function userRegistration (login: string, email: string, password: string) {
  return axios.post('/api/user/reg', {
    login,
    email,
    password
  });
}