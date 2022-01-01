import { createSelector } from 'reselect';


const getUserDataObject = (state) => state.userData;
const getWorkersObject = (state) => state.workersData;
const currentWorkerObject = (state) => state.currentWorkerData;


export const userDataSelector = createSelector([getUserDataObject], (userData) => userData);
export const workersDataSelector = createSelector([getWorkersObject], (workersData) => workersData);
export const currentWorkerDataSelector = createSelector([currentWorkerObject], (currentWorkerData) => currentWorkerData);
