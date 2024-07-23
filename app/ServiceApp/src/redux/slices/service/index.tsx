import {createSlice} from '@reduxjs/toolkit';

const service = createSlice({
  name: 'service',
  initialState: {
    currentService: [],
  },
  reducers: {
    setService: (state, action) => {
      state.currentService = action.payload;
    },
  },
});

export default service;
