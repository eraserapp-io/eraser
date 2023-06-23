export interface AuthContext {
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: (isLoggedIn: boolean) => void;
}
