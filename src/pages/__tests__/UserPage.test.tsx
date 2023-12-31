import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MainState } from '../../app/store';
import renderer from 'react-test-renderer';
import UserPage from '../UserPage';
import SearchUserPage from '../SearchUserPage';
import store from '../../app/store';

const mockStore = configureStore([thunk]);
const mockUser = {
  id: '1',
  login: 'johndoe',
  name: 'John Doe',
  avatar_url: 'avatar-url',
  public_repos: 2,
  number_of_repo_pages: 1,
  url: 'github-url',
  bio: 'Lorem ipsum',
  company: 'LovelyStay',
  location: 'Portugal',
  followers: 2,
  following: 1,
  public_gists: 0,
};

describe('UserPage', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <UserPage />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a back button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText('Github User Finder')
    ).toBeInTheDocument();
  });

  it('should lead to the search page when the back button is clicked', async () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'default',
            },
            error: undefined,
          },
          userList: {
            users: {
              total_count: 1, 
              incomplete_results: false, 
              items: [],
            }, 
            status: 'success', 
            error: undefined
          }
        } as MainState)}
      >
        <MemoryRouter initialEntries={['/johndoe']}>
          <Routes>
            <Route path='/' element={<SearchUserPage />} />
            <Route path='/:username' element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(
      screen.getByText('Github User Finder')
    );
    expect(
      screen.getByPlaceholderText('Type a github user to find it...')
    ).toBeInTheDocument();
  });

  it('should have a user info card', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'default',
            },
            error: undefined,
          },
          userList: {
            users: {
              total_count: 1, 
              incomplete_results: false, 
              items: [],
            }, 
            status: 'success', 
            error: undefined
          }
        } as MainState)}
      >
        <MemoryRouter initialEntries={['/johndoe']}>
          <UserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('generic', {
        name: /user-info/i,
      })
    ).toBeInTheDocument();
  });

  it('should have a repositories list', async () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [
              {
                id: '1',
                name: 'repo1',
                description: 'repo1 description',
              },
              {
                id: '2',
                name: 'repo2',
                description: 'repo2 description',
              },
            ],
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as MainState)}
      >
        <MemoryRouter initialEntries={['/johndoe']}>
          <UserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByRole('generic', {
        name: /repositories-list/i,
      })
    ).toBeInTheDocument();
  });
});
