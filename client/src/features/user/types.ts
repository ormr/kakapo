export enum UserActionsType {
  RECEIVE_USER_DATA = 'user/receiveUserData',
  SET_LOADING = 'user/setLoading',
  SET_FAILURE = 'user/setFailure',
  REQUEST_LOG_IN = 'user/fetchLogIn',
  REQUEST_REGISTER = 'user/fetchRegister',
  REQUEST_USER_DATA = 'user/requestUserData',
  SIGN_OUT = 'user/signOut',
};

export interface LogInData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
