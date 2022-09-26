import { call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '@src/core/axios';
import { AuthApi } from '@src/services/api/UserApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { setUser, setUserError } from './userSlice';

interface User {
  name: string;
  email: string;
  password: string;
};

function* fetchUserRegister({ payload }: PayloadAction<User>) {
  try {
    const { data } = yield call(AuthApi(Axios).register, payload);

    yield put(setUser(data))
  } catch (error) {
    yield put(setUserError())
  }
};

function* fetchUser() {
  try {
    const { data } = yield call(AuthApi(Axios).auth)

    yield put(setUser(data));
  } catch (error) {
    yield put(setUserError());
  }
};

function* fetchUserLogIn({ payload }: PayloadAction<User>) {
  try {
    const { data } = yield call(AuthApi(Axios).logIn, payload);

    yield put(setUser(data));
  } catch (error) {
    yield put(setUserError());
  }
};

export function* userSaga() {
  yield takeLatest('user/fetchUser', fetchUser);
  yield takeLatest('user/fetchUserLogIn', fetchUserLogIn);
  yield takeLatest('user/fetchUserRegister', fetchUserRegister);
};
