import { ReactElement } from 'react';
import moment from 'moment';

interface RepositoryItemProps {
  id: string;
  name: string;
  description?: string;
  url: string;
  stars: number;
  watchers: number;
  forks: number;
  issues: number;
  created_at: string;
  updated_at: string;
  language: string;
  topics: string[];
  visibility: string;
};

const RepositoryItem = (data: any): ReactElement => {
  const repo:RepositoryItemProps = data.data;

  if(!repo) return <></>

  const {
    name,
    description,
    url,
    stars,
    watchers,
    forks,
    issues,
    updated_at,
    language,
    topics,
    visibility
  } = repo;
  const formatLanguage = (language:string) => {
    const formattedName = language.toLowerCase();
    formattedName.replace('#','sharp')
    formattedName.replace('+','plus')
    formattedName.replace(/[^a-zA-Z0-9 ]/g, '')

    return formattedName;
  }
  return (
    <a href={url} target='_blank' className='repository-item' rel='noreferrer'>
      <h3 className='repository-name'>
        {name} 
        <span className='repository-visibility'>
          {visibility}
        </span>
      </h3>
      {description && <p className='repository-description'>{description}</p>}
      {topics?.length &&
        <ul className='repository-topic-list'>
          {topics.map((topic, key) => (
            <li className='topic-item' key={key}>{topic}</li>
          ))}
        </ul>
      }
      <div className='repository-data'>
        {language && 
          <div className={`repository-language color-${formatLanguage(language)}`}>{language}</div>
        }
        {forks !== undefined && 
          <div className='repository-forks'>
            <svg aria-label='fork' role='img' height='16' viewBox='0 0 16 16' version='1.1' width='16' data-view-component='true'>
              <path d='M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z'></path>
            </svg>
            {forks.toLocaleString('en-US')}
          </div>
        }
        {stars !== undefined &&
          <div className='repository-stars'>
            <svg aria-label='stars' role='img' height='16' viewBox='0 0 16 16' version='1.1' width='16' data-view-component='true'>
              <path d='M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z'></path>
            </svg>
            {stars.toLocaleString('en-US')}
          </div>
        }
        {watchers !== undefined &&
          <div className='repository-watchers'>
            <svg aria-hidden='true' height='16' viewBox='0 0 16 16' version='1.1' width='16' data-view-component='true'>
              <path d='M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z'></path>
            </svg>
            {watchers.toLocaleString('en-US')}
          </div>
        }
        {issues !== undefined &&
          <div className='repository-issues'>
            <svg aria-hidden='true' height='16' viewBox='0 0 16 16' version='1.1' width='16' data-view-component='true'>
              <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'></path><path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z'></path>
            </svg>
            {issues.toLocaleString('en-US')}
          </div>
        }
        <div className='repository-updated-at'>{moment(updated_at).fromNow()}</div>
      </div>
    </a>
  );
};

export default RepositoryItem;
