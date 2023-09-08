import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserList } from '../services/githubAPI';
import {
  UserList,
  APIUserListResponse,
  APIError,
} from '../types';

export interface UserListState {
  users: UserList | undefined;
  status: 'default' | 'success' | 'loading' | 'error';
  error: string | undefined;
}

const initialState: UserListState = {
  users: undefined,
  status: 'default',
  error: undefined,
};

export const searchUser = createAsyncThunk(
  'userList/searchUser',
  async (data: {username: string; page: number}) => {
    const { username, page } = data;
    const userList = await fetchUserList(username, page);
    return userList;
  }
);

const isAPIError = (
  toBeDetermined: APIUserListResponse
): toBeDetermined is APIError => {
  return (toBeDetermined as APIError).message !== undefined;
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        searchUser.fulfilled,
        (state, action: PayloadAction<APIUserListResponse>) => {
          if (isAPIError(action.payload)) {
            state.status = 'error';
            state.error = action.payload.message;
            return;
          }
          state.status = 'success';
          state.users = action.payload;
        }
      )
      .addCase(searchUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
  },
});

export default userListSlice.reducer;
