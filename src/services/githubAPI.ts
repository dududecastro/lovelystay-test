import {
  User,
  UserList,
  Repository,
  APIUserResponse,
  APIUserListResponse,
  APIRepositoryResponse,
} from '../types';

const TOKEN = process.env.REACT_APP_GH_TOKEN;

const hasResponseErrors = (response:any) => {
  if (response.status === 403) {
    return 'GitHub API rate limit exceeded, please try again later.';
  }
  
  return response.status === 404 ? 'User not found' : response.statusText;
}

export const fetchUserList = async (
  username: string,
  page: number
): Promise<APIUserListResponse> => {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=${username}&page=${page}&per_page=20`, {
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${TOKEN}`,
      },
    });
    if (response.status === 403 || !response.ok) {
      return { message: hasResponseErrors(response) };
    }
    const data = await response.json();

    const users: UserList = {
      total_count: data.total_count,
      incomplete_results: data.incomplete_results,
      items: data.items
    };

    return users;
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};
export const fetchUser = async (username: string): Promise<APIUserResponse> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${TOKEN}`,
      },
    });
    if (response.status === 403 || !response.ok) {
      return { message: hasResponseErrors(response) };
    }
    const data = await response.json();

    const user: User = {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      url: data.url,
      public_repos: data.public_repos,
      bio: data.bio,
      location: data.location,
      company: data.company,
      followers: data.followers,
      following: data.following,
      public_gists: data.public_gists,
      number_of_repo_pages: data.public_repos
        ? Math.ceil(data.public_repos / 10)
        : 1,
    };

    return user;
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};
export const fetchRepos = async (
  username: string,
  page: number
): Promise<APIRepositoryResponse> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`, {
        headers: {
          'Authorization': `token ${TOKEN}`,
        },
      });
    if (!response.ok) {
      return {
        message: response.statusText,
      };
    }
    const data = await response.json();

    const repos: Repository[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      updated_at: repo.updated_at,
      language: repo.language,
      topics: repo.topics,
      visibility: repo.visibility,
    }));

    return repos;
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};
