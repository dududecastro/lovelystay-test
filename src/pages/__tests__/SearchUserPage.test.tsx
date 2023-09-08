import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SearchUserPage from '../SearchUserPage';
import store from '../../app/store';

describe('SearchUserPage', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <SearchUserPage />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a search input', () => {
    render(
      <MemoryRouter>
        <SearchUserPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Type a github user to find it...')).toBeInTheDocument();
  });

  it('should have a search button', () => {
    render(
      <MemoryRouter>
        <SearchUserPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
