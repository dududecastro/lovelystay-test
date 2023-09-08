import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepositoryItem from '../RepositoryItem';

const mockRepository = {
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
  }

describe('RepositoryItem', () => {
  it('should render the repository item', () => {
    render(<RepositoryItem key={1} data={mockRepository} />);
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('description1')).toBeInTheDocument();
  });
});
