import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    profilePic: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    userType: '',
    token: '',
  },
  reducers: {
    setUserDetails: (state, action) => {
      const {
        _id,
        profilePic,
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
        token,
      } = action.payload;

      if (_id) {
        state._id = _id;
      }
      if (profilePic) {
        state.profilePic = profilePic;
      }
      if (firstName) {
        state.firstName = firstName;
      }
      if (lastName) {
        state.lastName = lastName;
      }
      if (phone) {
        state.phone = phone;
      }
      if (address) {
        state.address = address;
      }
      if (token) {
        state.token = token;
      }
      if (email) {
        state.email = email;
      }
      if (password) {
        state.password = password;
      }
    },
  },
});

export const {setUserDetails} = user.actions;
export default user;
