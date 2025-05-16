import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../apis/post/postApi';
import PostListTable from './components/PostListTable';
import Pagination from '../../components/pagination/Pagination';
const PostListPage = () => {
  const { boardId } = useParams();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    pages: 0,
    items: 0,
    first: 0,
    next: 0,
    last: 0,
  });

  const getPostsData = useCallback(async ({ boardId, page, limit }) => {
    const { data, first, next, last, pages, items } = await getPosts({
      boardId,
      page,
      limit,
    });
    setPosts(data);
    setPagination((prev) => ({ ...prev, first, next, last, pages, items }));
    return { data, first, next, last, pages, items };
  }, []);

  const { isPending } = useQuery({
    queryKey: ['posts', boardId, pagination.page, pagination.limit],
    queryFn: ({ queryKey }) => {
      console.log(queryKey);
      const [_key, boardId, page, limit] = queryKey;
      return getPostsData({ boardId, page, limit });
    },
    keepPreviousData: true,
    enabled: !!boardId,
  });

  const onPageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  }, []);

  if (isPending) return 'Loading...';
  return (
    <div>
      <PostListTable
        postList={posts}
        offset={(pagination.page - 1) * pagination.limit}
      />
      <Pagination
        totalCount={pagination.items}
        currentPage={pagination?.page}
        limit={pagination?.limit}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PostListPage;
