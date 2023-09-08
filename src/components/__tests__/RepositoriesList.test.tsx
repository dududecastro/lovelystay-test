import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainState } from '../../app/store';
import RepositoriesList from '../RepositoriesList';

const mockStore = configureStore([thunk]);

const mockRepositories = [
  {
    id: '1',
    name: 'repo1',
    description: 'description1',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '2',
    name: 'repo2',
    description: 'description2',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '3',
    name: 'repo3',
    description: 'description3',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '4',
    name: 'repo4',
    description: 'description4',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '5',
    name: 'repo5',
    description: 'description5',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '6',
    name: 'repo6',
    description: 'description6',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '7',
    name: 'repo7',
    description: 'description7',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '8',
    name: 'repo8',
    description: 'description8',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '9',
    name: 'repo9',
    description: 'description9',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '10',
    name: 'repo10',
    description: 'description10',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '11',
    name: 'repo11',
    description: 'description11',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '12',
    name: 'repo12',
    description: 'description12',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '13',
    name: 'repo13',
    description: 'description13',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '14',
    name: 'repo14',
    description: 'description14',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '15',
    name: 'repo15',
    description: 'description15',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '16',
    name: 'repo16',
    description: 'description16',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '17',
    name: 'repo17',
    description: 'description17',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '18',
    name: 'repo18',
    description: 'description18',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '19',
    name: 'repo19',
    description: 'description19',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '20',
    name: 'repo20',
    description: 'description20',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '21',
    name: 'repo21',
    description: 'description21',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '22',
    name: 'repo22',
    description: 'description22',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '23',
    name: 'repo23',
    description: 'description23',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '24',
    name: 'repo24',
    description: 'description24',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '25',
    name: 'repo25',
    description: 'description25',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '26',
    name: 'repo26',
    description: 'description26',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '27',
    name: 'repo27',
    description: 'description27',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '28',
    name: 'repo28',
    description: 'description28',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '29',
    name: 'repo29',
    description: 'description29',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
  {
    id: '30',
    name: 'repo30',
    description: 'description30',
    url: 'repo.url',
    stars: 0,
    watchers: 0,
    forks: 0,
    issues: 0,
    updated_at: '2020-09-05T13:42:21Z',
    language: 'Javascript',
    topics: ['test'],
    visibility: 'public'
  },
];

const mockUser = {
  id: '1',
  login: 'johndoe',
  name: 'John Doe',
  avatar_url: 'avatar-url',
  public_repos: 2,
  number_of_repo_pages: 2,
  url: 'github-url',
  bio: 'Lorem ipsum',
  company: 'LovelyStay',
  location: 'Portugal',
  followers: 2,
  following: 1,
  public_gists: 0,
};

describe('RepositoriesList', () => {
  it('should have render all repositories', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('description1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('description2')).toBeInTheDocument();
    expect(screen.getByText('repo3')).toBeInTheDocument();
    expect(screen.getByText('description3')).toBeInTheDocument();
    expect(screen.getByText('repo4')).toBeInTheDocument();
    expect(screen.getByText('description4')).toBeInTheDocument();
    expect(screen.getByText('repo5')).toBeInTheDocument();
    expect(screen.getByText('description5')).toBeInTheDocument();
  });

  it('should have render no repositories message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
          userList: {
            users: {
              total_count: 30, 
              incomplete_results: false, 
              items: [],
            }, 
            status: 'success', 
            error: undefined
          }
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  it('should be able to render without a description', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [
              {
                id: '1',
                name: 'repo1',
                description: '',
                url: 'repo.url',
                stars: 0,
                watchers: 0,
                forks: 0,
                issues: 0,
                updated_at: '2020-09-05T13:42:21Z',
                language: 'Javascript',
                topics: ['test'],
                visibility: 'public'
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
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('repo1')).toBeInTheDocument();
  });

  it('should have render loading message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'loading',
            },
            error: undefined,
          },
          userList: {
            users: {
              total_count: 30, 
              incomplete_results: false, 
              items: [],
            }, 
            status: 'success', 
            error: undefined
          }
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
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
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'error',
            },
            error: 'Error message',
          },
          userList: {
            users: {
              total_count: 30, 
              incomplete_results: false, 
              items: [],
            }, 
            status: 'success', 
            error: undefined
          }
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should be able to go to next page', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Previous')).toBeEnabled();
  });

  it('Should be able to go to previous page', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as MainState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Previous')).toBeEnabled();
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Next')).toBeEnabled();
  });
});
