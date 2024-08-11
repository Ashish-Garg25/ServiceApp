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
    phoneVerified: false,
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
        phoneVerified,
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
      if (phoneVerified) {
        state.phoneVerified = true;
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
