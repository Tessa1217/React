import { Outlet, useParams } from 'react-router-dom';

const PostLayout = () => {
  const { boardId } = useParams();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Board: {boardId}</h2>
      <Outlet />
    </div>
  );
};

export default PostLayout;
