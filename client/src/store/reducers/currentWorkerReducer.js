import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncActionsCreator } from '../../store/reducers/reducersHelper'
import * as api from '../../services/api';

export const saveWorker = createAsyncThunk(
    'currentWorker/saveWorker',
    async (workerData) => await api.saveWorker(workerData),
  );
export const updateWorker = createAsyncThunk('currentWorker/updateWorker', async (workerDataForUpdate) =>
  api.updateWorker(workerDataForUpdate),
);

export const currentWorkerSlice = createSlice({
    name: 'currentWorker',
    initialState: {
      worker: null,
    },
    reducers: {
      setWorkerState: (state, { payload }) => {
        state.worker = payload
      },
    },
    extraReducers: {
      ...asyncActionsCreator(
        saveWorker,
        'saveWorker',
        {
          fulfilled: (state, { payload }) => {
            state.worker = payload.result;
          },
        },
      ),
  
      ...asyncActionsCreator(updateWorker, 'updateWorker', {
        fulfilled: (state, { payload }) => {
            state.worker = payload.result;
        },
      }),
    },
  });

  export const { setWorkerState } = currentWorkerSlice.actions;

export default currentWorkerSlice.reducer;