import React, { useState } from 'react';
import User from './User';
import { useUsersDispatch, useUsersState, getUsers } from './UsersContext';

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  // 버튼이 클릭될 때 호출되도록 onClick에 넣을 함수로 생성
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;
  
  return (
    <>
        <ul>
        {users.map(user => (
            <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
            </li>
        ))}
        </ul>
        <button onClick={fetchData}>다시 불러오기</button>
        {/* && => userId가 존재하면 */}
        {userId && <User id={userId} />}
    </>
  );
}
  
export default Users;

