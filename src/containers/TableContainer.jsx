import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../stores/apiSample';
import UserTable from '../components/users/UserTable';

const TableContainer = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(({ api }) => ({
    users: api.users,
  }));
  return (
    <>
      <button onClick={() => dispatch(fetchUsers())}>유저 회원 조회</button>
      <UserTable users={users} />
    </>
  );
};

export default TableContainer;
