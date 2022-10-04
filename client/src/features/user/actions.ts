import { User } from "../../services/api/UserApi";
import { LogInData, RegisterData, UserActionsType } from "./types";

export const receiveUserData = (payload: User) => ({
  type: UserActionsType.RECEIVE_USER_DATA,
  payload,
});

export const setUserLoading = () => ({
  type: UserActionsType.SET_LOADING,
});

export const setUserFailure = () => ({
  type: UserActionsType.SET_FAILURE,
})

export const requestLogIn = (payload: LogInData) => ({
  type: UserActionsType.REQUEST_LOG_IN,
  payload,
});

export const requestRegister = (payload: RegisterData) => ({
  type: UserActionsType.REQUEST_REGISTER,
  payload,
});

export const requestUserData = () => ({
  type: UserActionsType.REQUEST_USER_DATA,
});

export const requestLogOut = () => ({
  type: UserActionsType.REQUEST_LOG_OUT,
});

export const clearUserData = () => ({
  type: UserActionsType.CLEAR_USER_DATA,
});

