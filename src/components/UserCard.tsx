import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const UserCard = (data:any): ReactElement => {
  const userdata:User = data.data;
  const {
    login,
    avatar_url,
  } = userdata;

  const navigate = useNavigate();

  function handleClick() {
    return navigate(`/${login}`);
  }
  
  return (
    <div className='user-card' onClick={handleClick}>
      <div className='photo'>
        <img src={avatar_url} alt={login} />
      </div>
      <div className='name'>
        {login}
      </div>
    </div>
  )
}

export default UserCard;