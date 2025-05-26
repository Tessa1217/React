import client from '@/shared/api/client';

export const checkDuplicateEmail = (email) => {
  return client.get(`/user/${email}/exists`);
};
