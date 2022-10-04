import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../../services/api/UserApi';
import Axios from '../../core/axios';
import { clearUserData, receiveUserData, setUserFailure, setUserLoading } from './actions';
import { LogInData, RegisterData, UserActionsType } from './types';


function* fetchUserRegister({ payload }: PayloadAction<RegisterData>) {
  try {
    const { data } = yield call(AuthApi(Axios).register, payload);

    yield put(receiveUserData(data));
    yield put(push('/log-in'));
  } catch (error) {
    yield put(setUserFailure());
  }
}

function* requestUserData() {
  try {
    yield put(setUserLoading());
    const { data } = yield call(AuthApi(Axios).auth);

    yield put(receiveUserData(data));
  } catch (error) {
    yield put(setUserFailure());
  }
}

function* requestUserLogIn({ payload }: PayloadAction<LogInData>) {
  try {
    const { data } = yield call(AuthApi(Axios).logIn, payload);

    yield put(receiveUserData(data));
    yield put(push('/profile'));
  } catch (error) {
    yield put(setUserFailure());
  }
}

function* requestLogOut() {
  try {
    yield call(AuthApi(Axios).logOut)
    yield put(clearUserData());
  } catch (error) {
    yield put(setUserFailure());
  }
}

export default function* userSaga() {
  yield takeLatest(UserActionsType.REQUEST_USER_DATA, requestUserData);
  yield takeLatest(UserActionsType.REQUEST_LOG_IN, requestUserLogIn);
  yield takeLatest(UserActionsType.REQUEST_REGISTER, fetchUserRegister);
  yield takeLatest(UserActionsType.REQUEST_LOG_OUT, requestLogOut);
}

