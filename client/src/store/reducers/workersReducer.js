import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { asyncActionsCreator } from '../../store/reducers/reducersHelper'
import * as api from '../../services/api';


export const loadWorkers = createAsyncThunk('workers/loadWorkers', async () => await api.loadWorkers());

export const deleteWorker = createAsyncThunk(
  'meetings/deleteWorker',
  async (workerId) => await api.deleteWorker(workerId),
);



export const workersSlice = createSlice({
    name: 'workers',
    initialState: {
        workers: [],
    },
    extraReducers: {
      ...asyncActionsCreator(
        loadWorkers,
        'loadWorkers',
        {
          fulfilled: (state, { payload }) => {
            state.workers = [...payload.result];
          },
        },
      ),
  
      ...asyncActionsCreator(deleteWorker, 'deleteWorker', {
        fulfilled: (state, { payload }) => {
          state.workers = state.workers.filter((item) => item._id !== payload.result._id);
        },
      }
      ),
    },
  });
  
  export default workersSlice.reducer;