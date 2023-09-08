import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, MainState } from '../app/store';
import { searchUser } from '../reducers/userListSlice';
import UserCard from '../components/UserCard';
import { User } from '../types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const UserList = (name:any): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [username, setUsername] = useState('');
  
  const { users, status, error } = useSelector((state: MainState) => state.userList);

  useEffect(() => {
    if(username !== name.username){
      setUsername(name.username)
      dispatch(searchUser({username: name.username, page:page}));
    }
    if(users) {
      setNumberOfPages(users?.total_count || 1);
    }
  }, [
    dispatch, 
    page, 
    users, 
    status, 
    username, 
    name.username]);

  const handlePageChange = (number:number) => {
    const newPage = number >= 0 ? page + number : page - number;
    
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage);
    dispatch(searchUser({username: name.username, page:newPage}));
  };

  if(users?.total_count && !error) {
    return (
      <div className='user-list'>
        {users.items.map((item:User, key:number) => <UserCard data={item} key={key} />)}
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
    )
  }

  return (
    <div className='error-msg'>{error}</div>
  )
};

export default UserList;