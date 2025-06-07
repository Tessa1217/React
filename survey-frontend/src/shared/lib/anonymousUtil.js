export const ANONYMOUS_KEY = 'anonymous_id';

export const getAnonymousId = () => localStorage.getItem(ANONYMOUS_KEY);

export const createAnonymousId = () => {
  const id = crypto.randomUUID().substring(0, 36);
  localStorage.setItem(ANONYMOUS_KEY, id);
  return id;
};

export const clearAnonymousId = () => {
  localStorage.removeItem(ANONYMOUS_KEY);
};
