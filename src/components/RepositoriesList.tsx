import { ReactElement, useEffect, useState, useRef } from 'react';
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

  const currPage = useRef(0);

  useEffect(() => {
    if(user && currPage.current !== page){
      console.log('currPage.current: ',currPage.current)
      console.log('page',page)
      console.log('user',user)
      console.log('status.user',status.user)
      currPage.current = page;
      if (status.user === 'success') {
        dispatch(getRepos({ username: user?.login, page }));
        setNumberOfPages(user.number_of_repo_pages);
      }
    }
  }, [dispatch, page, user, status.user]);

  const handlePageChange = (number:number) => {
    const newPage = page + number;

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage);
  };

  return (
    <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>Repositories</h2>
        {(status.user === 'success' && status.repos === 'success') &&
          <>
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
            {numberOfPages &&
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
            }
          </>
        }
        {(status.user === 'success' && status.repos === 'loading') && <p className='status-message'>Loading...</p>}
        {(status.user === 'success' && status.repos === 'error') && <p className='status-message'>{error}</p>}
      </div>
    );
};

export default RepositoriesList;