import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error?.response?.data?.message || "Something went wrong"}`);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error?.response?.data?.message || "Something went wrong"}`);
  }
};