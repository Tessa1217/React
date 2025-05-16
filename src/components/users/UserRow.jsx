const UserRow = ({ user }) => {
  console.log(user);
  return (
    <tr className='hover:bg-gray-50'>
      <td className='px-6 py-4 border-b'>{user.name}</td>
      <td className='px-6 py-4 border-b'>{user.username}</td>
      <td className='px-6 py-4 border-b'>{user.email}</td>
      <td className='px-6 py-4 border-b'>{user.phone}</td>
    </tr>
  );
};

export default UserRow;
