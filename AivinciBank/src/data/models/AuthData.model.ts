import { User } from "./User.model";

export interface RegisterData{
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthData{
    user: User;
    isLoggedIn: boolean;
    isLoading: boolean;
    isRegister: boolean;
    registerData: RegisterData;
}