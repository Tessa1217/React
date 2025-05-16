import PostListRow from '../components/PostListRow';

const PostListTable = ({ postList, offset }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg'>
        <thead>
          <tr className='bg-gray-100 text-left text-sm font-medium text-gray-700'>
            <th className='px-6 py-3 border-b'>번호</th>
            <th className='px-6 py-3 border-b'>제목</th>
            <th className='px-6 py-3 border-b'>작성자</th>
            <th className='px-6 py-3 border-b'>등록일</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 ? (
            postList.map((post, idx) => (
              <PostListRow
                key={post.id}
                {...post}
                rownum={offset + (idx + 1)}
              />
            ))
          ) : (
            <tr className='hover:bg-gray-50'>
              <td colSpan='4' className='px-6 py-4 text-center text-gray-500'>
                조회된 게시물이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostListTable;
