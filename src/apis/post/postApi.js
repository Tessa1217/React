import client from '../../utils/client';

export const getPosts = async ({ boardId, page = 1, limit = 5 }) => {
  console.log(boardId);
  console.log(page);
  console.log(limit);
  const res = await client.get(`http://localhost:3001/posts`, {
    params: { _page: page, _per_page: limit, boardId },
  });
  return res.data;
};

export const getPost = async ({ boardId, postId }) => {
  const res = await client.get(`/boards/${boardId}/posts/${postId}`);
  return res.data;
};
