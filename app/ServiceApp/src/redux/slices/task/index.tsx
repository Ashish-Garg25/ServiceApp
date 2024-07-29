import {createSlice} from '@reduxjs/toolkit';

const task = createSlice({
  name: 'task',
  initialState: {
    invited: null,
  },
  reducers: {
    setInvited: (state, action) => {
      state.invited = action.payload;
    },
  },
});

export default task;
