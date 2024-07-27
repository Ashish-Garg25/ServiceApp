import {createSlice} from '@reduxjs/toolkit';

const notification = createSlice({
  name: 'notification',
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    addToUnreadCount: state => {
      state.unreadCount += 1;
    },
  },
});

export default notification;
