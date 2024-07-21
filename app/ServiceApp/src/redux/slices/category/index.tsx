import {createSlice} from '@reduxjs/toolkit';

const category = createSlice({
  name: 'category',
  initialState: {categories: [], singleCategory: null},
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setSingleCategory: (state, action) => {
      state.singleCategory = action.payload;
    },
  },
});

export const {setCategory} = category.actions;
export default category;
