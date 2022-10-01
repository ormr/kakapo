import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { setUser, setUserError } from './userSlice'
import { AuthApi } from '../../services/api/UserApi'
import { Axios } from '../../core/axios'
import { parseCookies } from 'nookies'

interface User {
  name: string
  email: string
  password: string
}

function* fetchUserRegister({ payload }: PayloadAction<User>) {
  try {
    const { data } = yield call(AuthApi(Axios).register, payload)

    yield put(setUser(data))
  } catch (error) {
    yield put(setUserError())
  }
}

function* fetchUser() {
  try {
    const { data } = yield call(AuthApi(Axios).auth)

    yield put(setUser(data))
  } catch (error) {
    yield put(setUserError())
  }
}

function* requestUserLogIn({ payload }: PayloadAction<User>) {
  try {
    const { data } = yield call(AuthApi(Axios).logIn, payload)

    yield put(setUser(data))
  } catch (error) {
    yield put(setUserError())
  }
}

export function* userSaga() {
  yield takeLatest('user/fetchUser', fetchUser)
  yield takeLatest('user/requestUserLogIn', requestUserLogIn)
  yield takeLatest('user/fetchUserRegister', fetchUserRegister)
}
