export const jwtStr = ({ auth }) => auth.accessToken;

export const currentUserName = ({ auth }) => auth.user?.name;

export const currentlyLoggedIn = ({ auth }) => auth.isLoggedIn;
