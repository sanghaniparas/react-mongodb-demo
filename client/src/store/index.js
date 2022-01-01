import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import currentWorkerReducer from './reducers/currentWorkerReducer';
import workersReducer from './reducers/workersReducer';



export default configureStore({
    reducer: {
        userData: userReducer,
        currentWorkerData: currentWorkerReducer,
        workersData: workersReducer
    },
});