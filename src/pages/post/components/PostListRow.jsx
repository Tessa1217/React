const PostListRow = ({ rownum, title, author, createdAt }) => {
  return (
    <tr className='hover:bg-gray-50'>
      <td className='px-6 py-4 border-b'>{rownum}</td>
      <td className='px-6 py-4 border-b'>{title}</td>
      <td className='px-6 py-4 border-b'>{author}</td>
      <td className='px-6 py-4 border-b'>{createdAt}</td>
    </tr>
  );
};

export default PostListRow;
