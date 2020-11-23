import axios from 'axios';

export function userLogin (email: string, password: string) {
  return axios.post('/api/user/login', {
    email,
    password
  });
}

export function userRegistration (email: string, password: string) {
  return axios.post('/api/user/reg', {
    email,
    password
  });
}