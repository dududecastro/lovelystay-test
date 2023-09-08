import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainState } from '../../app/store';
import UserHeader from '../UserHeader';

const mockStore = configureStore([thunk]);

describe('UserHeader', () => {
  it('should have render all user information', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: {
              id: '1',
              login: 'johndoe',
              name: 'John Doe',
              avatar_url: 'avatar-url',
              public_repos: 0,
              number_of_repo_pages: 0,
              url: 'github-url',
              bio: 'Lorem ipsum dolor sit amet.',
              company: 'LovelyStay',
              location: 'Portugal',
              followers: 356,
              following: 25,
              public_gists: 0,
            },
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
        <MemoryRouter>
          <UserHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('should have render loading message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: undefined,
            repositories: [],
            status: {
              user: 'loading',
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
        <MemoryRouter>
          <UserHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should have render error message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: undefined,
            repositories: [],
            status: {
              user: 'error',
              repos: 'default',
            },
            error: 'Something went wrong please try again later!',
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
        <MemoryRouter>
          <UserHeader />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText('Something went wrong please try again later!')
    ).toBeInTheDocument();
  });
})