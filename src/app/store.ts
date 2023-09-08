import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import userListReducer from '../reducers/userListSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
  },
});

export type MainState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
