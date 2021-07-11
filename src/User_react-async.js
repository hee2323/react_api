import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

// parameter를 받아와서 쓰지않고 id를 객체 형태로 받아오기 위해 중괄호로 감싸기 (비구조화 할당 예정)
async function getUser({ id }) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  return response.data;
}

// watch는 deps와 유사한 개념
function User({ id }) {
  const {
    data: user,
    error,
    isLoading
  } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </div>
  );
}

export default User;

