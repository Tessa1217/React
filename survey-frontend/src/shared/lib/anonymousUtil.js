const ANONYMOUS_KEY = import.meta.env.VITE_APP_ANONYMOUS_KEY;

/**
 * 로컬 스토리지에서 익명 사용자 ID를 가져옴
 *
 * @returns {string|null} 저장된 익명 ID 또는 null
 */
export const getAnonymousId = () => localStorage.getItem(ANONYMOUS_KEY);

/**
 * 새로운 익명 사용자 ID를 생성하고 로컬 스토리지에 저장
 *
 * @returns {string} 생성된 익명 ID
 */
export const createAnonymousId = () => {
  const id = crypto.randomUUID().substring(0, 36);
  localStorage.setItem(ANONYMOUS_KEY, id);
  return id;
};

/**
 * 로컬 스토리지에서 익명 사용자 ID 삭제
 */
export const clearAnonymousId = () => {
  localStorage.removeItem(ANONYMOUS_KEY);
};
