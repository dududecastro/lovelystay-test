import { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainState, AppDispatch } from '../app/store';
import { useSearchParams } from 'react-router-dom';
import { getRepos } from '../reducers/userSlice';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const RepositoriesList = (): ReactElement => {
  const { user, repositories, status, error } = useSelector(
    (state: MainState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    if (user && status.user === 'success') {
      dispatch(getRepos({ username: user?.login, page }));
      setNumberOfPages(user.number_of_repo_pages);
    }
  }, [dispatch, page, user, status.user]);

  const handlePageChange = (number:number) => {
    const newPage = number >= 0 ? page + number : page - number;

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage);
  };

  if (status.user === 'success' && status.repos === 'success')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>Repositories</h2>
        {repositories.length === 0 && 
          <p className='status-message'>
            No repositories found
          </p>
        }
        <div className='repositories-list'>
          {repositories.map((repo: Repository) => (
            <RepositoryItem
              key={repo.id}
              data={repo}
            />
          ))}
        </div>
        {numberOfPages ?
        <div className='repositories-buttons'>
          <button onClick={(e) => handlePageChange(-1)} disabled={page === 1}>
            <IoIosArrowBack /> Previous
          </button>
          <button
            onClick={(e) => handlePageChange(1)}
            disabled={page === numberOfPages}
          >
            Next <IoIosArrowForward />
          </button>
        </div>
        :
        <></>
        }
      </div>
    );
  else if (status.user === 'success' && status.repos === 'loading')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>{user?.login}'s Repositories</h2>
        <p className='status-message'>Loading...</p>
      </div>
    );
  else if (status.user === 'success' && status.repos === 'error')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>{user?.login}'s Repositories</h2>
        <p className='status-message'>{error}</p>
      </div>
    );
  else return <></>;
};

export default RepositoriesList;
