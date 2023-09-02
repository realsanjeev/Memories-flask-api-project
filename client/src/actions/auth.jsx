import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log("as data", data)

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error?.response?.data?.message)
    alert(`Error: ${error?.response?.data?.message}`);
  }
};