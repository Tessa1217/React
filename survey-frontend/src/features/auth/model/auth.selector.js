/**
 * Redux 상태에서 JWT 액세스 토큰을 반환
 *
 * @param {Object} state - Redux 상태 객체
 * @returns {string} - JWT accessToken 문자열
 */
export const jwtStr = ({ auth }) => auth.accessToken;

/**
 * Redux 상태에서 현재 로그인한 사용자의 이름을 반환
 *
 * @param {Object} state - Redux 상태 객체
 * @returns {string|undefined} - 사용자 이름 (로그인하지 않았을 경우 undefined)
 */
export const currentUserName = ({ auth }) => auth.user?.name;

/**
 * Redux 상태에서 현재 로그인 여부를 반환
 *
 * @param {Object} state - Redux 상태 객체
 * @returns {boolean} - 로그인 상태 여부
 */
export const currentlyLoggedIn = ({ auth }) => auth.isLoggedIn;
