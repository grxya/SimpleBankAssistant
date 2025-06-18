import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  CreateUserAction,
  DeleteUserAction,
  GetAllUsersAction,
  GetUserAction,
  UpdateUserAction,
  UpdateUserRoleAction,
} from "../actions/userAction";
import { User } from "../../data/models/User.model";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const GetAllUsers = async () => {
    const result = await dispatch(GetAllUsersAction());
    console.log(result);
    return result;
  };

  const CreateUser = async (newUser: User) => {
    const result = await dispatch(CreateUserAction(newUser));
    console.log(result);
    return result;
  };

  const GetUser = async (userId: string) => {
    const result = await dispatch(GetUserAction(userId));
    console.log(result);
    return result;
  };

  const UpdateUser = async (userId: string, NewUser: User) => {
    const result = await dispatch(UpdateUserAction({ userId, NewUser }));
    console.log(result);
    return result;
  };

  const UpdateUserRole = async (userId: string, role: string) => {
    const result = await dispatch(UpdateUserRoleAction({ userId, role }));
    console.log(result);
    return result;
  };

  const DeleteUser = async (userId: string) => {
    const result = await dispatch(DeleteUserAction(userId));
    console.log(result);
    return result;
  };

  return {
    GetAllUsers,
    CreateUser,
    GetUser,
    UpdateUser,
    UpdateUserRole,
    DeleteUser,
  };
};

export const useUserState = () => {
  return useSelector((state: RootState) => state.user);
};
