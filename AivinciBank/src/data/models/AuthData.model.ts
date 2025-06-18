import { User } from "./User.model";

export interface AuthData {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  isUserFetching: boolean;
}
