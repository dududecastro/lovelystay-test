export type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  public_repos: number;
  bio: string;
  location: string;
  company: string;
  followers: number;
  following: number;
  number_of_repo_pages: number;
  public_gists: number;
};

export type UserList = {
  total_count: number;
  incomplete_results: boolean;
  items: User[]
};


export type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  watchers: number;
  forks: number;
  issues: number;
  updated_at: string;
  language: string;
  topics: string[];
  visibility: string;
};

export type APIError = {
  message: string;
};

export type APIUserResponse = User | APIError;

export type APIUserListResponse = UserList | APIError;

export type APIRepositoryResponse = Repository[] | APIError;
