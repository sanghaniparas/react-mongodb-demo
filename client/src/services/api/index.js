import { get, post, patch, httpDelete } from './axios';

/* auth requests */
export const login = (body) => post('/auth/login', body);
export const registration = (body) => post('/auth/registration', body);

export const saveWorker = (body) => post('/worker', body);
export const updateWorker = (body) => patch(`/worker/${body.id}`, body.data);
export const deleteWorker = (id) => httpDelete(`/worker/${id}`)
export const loadWorkers = () => get('/worker');