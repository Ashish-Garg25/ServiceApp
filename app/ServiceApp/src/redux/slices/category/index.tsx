import {createSlice} from '@reduxjs/toolkit';

const category = createSlice({
  name: 'category',
  initialState: {categories: []},
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {setCategory} = category.actions;
export default category;
