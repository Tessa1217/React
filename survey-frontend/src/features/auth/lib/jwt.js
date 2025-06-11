/**
 * JWT 토큰을 파싱하여 payload(JSON 객체)를 반환하는 함수
 *
 * @param {string} token - JWT 형식의 문자열 (예: header.payload.signature)
 * @returns {Object|null} - 파싱된 payload 객체 또는 실패 시 null
 */
export default function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]; // payload 부분
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid JWT token', e);
    return null;
  }
}
