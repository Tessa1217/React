import UserRow from './UserRow';

const UserTable = ({ users }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg'>
        <thead>
          <tr className='bg-gray-100 text-left text-sm font-medium text-gray-700'>
            <th className='px-6 py-3 border-b'>Name</th>
            <th className='px-6 py-3 border-b'>UserName</th>
            <th className='px-6 py-3 border-b'>Email</th>
            <th className='px-6 py-3 border-b'>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow key={user.id + '_' + user.name} user={user} />
            ))
          ) : (
            <tr className='hover:bg-gray-50'>
              <td colSpan='4' className='px-6 py-4 text-center text-gray-500'>
                조회된 유저가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
