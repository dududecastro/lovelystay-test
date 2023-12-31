import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { 
  fetchUser,
  fetchRepos 
} from '../services/githubAPI';
import {
  User,
  Repository,
  APIUserResponse,
  APIRepositoryResponse,
  APIError,
  Status
} from '../types';

export interface UserState {
  user: User | undefined;
  repositories: Repository[];
  status: {
    user: Status;
    repos: Status;
  };
  error: string | undefined;
}

const initialState: UserState = {
  user: undefined,
  repositories: [],
  status: {
    user: 'default',
    repos: 'default',
  },
  error: undefined,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (username: string) => {
    const user = await fetchUser(username);
    return user;
  }
);

export const getRepos = createAsyncThunk(
  'user/getRepos',
  async (data: { username: string; page: number }) => {
    const { username, page } = data;
    const repos = await fetchRepos(username, page);
    return repos;
  }
);

export const cleanUser = createAsyncThunk(
  'user/cleanUser',
  () => {
    const user:undefined = undefined;
    const repositories:Repository[] = [];
    return {
      user: user,
      repositories: repositories,
    };
  }
);

const isAPIError = (
  toBeDetermined: APIUserResponse | APIRepositoryResponse
): toBeDetermined is APIError => {
  return (toBeDetermined as APIError).message !== undefined;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status.user = 'loading';
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<APIUserResponse>) => {
          if (isAPIError(action.payload)) {
            state.status.user = 'error';
            state.error = action.payload.message;
            return;
          }
          state.status.user = 'success';
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.status.user = 'error';
        state.error = action.error.message;
      })
      .addCase(getRepos.pending, (state) => {
        state.status.repos = 'loading';
      })
      .addCase(
        getRepos.fulfilled,
        (state, action: PayloadAction<APIRepositoryResponse>) => {
          if (isAPIError(action.payload)) {
            state.status.repos = 'error';
            state.error = action.payload.message;
            return;
          }
          state.status.repos = 'success';
          state.repositories = action.payload;
        }
      )
      .addCase(getRepos.rejected, (state, action) => {
        state.status.repos = 'error';
        state.error = action.error.message;
      })
      .addCase(cleanUser.fulfilled, (state, action) => {
        state.status.repos = 'success';
        state.user = action.payload.user;
        state.repositories = action.payload.repositories;
      });
  },
});

export default userSlice.reducer;
