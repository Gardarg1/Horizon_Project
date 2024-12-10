/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginArgs, RegistrationArgs, UserResponse } from './types';
import instance from '@/src/shared/api';

export const getUser = createAsyncThunk('get user', async (args, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk('login', async (data: LoginArgs, { rejectWithValue }) => {
  try {
    const res = (await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      ...data,
    })) as AxiosResponse<UserResponse>;
    localStorage.setItem('accessToken', res.data.accessToken);

    return res.data.user;
  } catch (error) {
    const e = error as AxiosError<any>;
    console.log(e);
    return rejectWithValue(e.response?.data.message);
  }
});

export const signup = createAsyncThunk(
  'signup',
  async (data: RegistrationArgs, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/registration`, {
        ...data,
      });
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const logout = createAsyncThunk('logout', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const checkUser = createAsyncThunk(
  'check authorization',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`);
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const forgotPassword = createAsyncThunk(
  'forgot password',
  async (email: string, { rejectWithValue }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`, { email });
      return;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const checkResetToken = createAsyncThunk(
  'check reset token',
  async (token: string, { rejectWithValue }) => {
    try {
      console.log(token);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password/chek/${token}`,
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'reset password',
  async ({ password, token }: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const res = (await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password/`, {
        password,
        token,
      })) as AxiosResponse<UserResponse>;
      localStorage.setItem('accessToken', res.data.accessToken);

      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeSkin = createAsyncThunk(
  'change skin',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-skin`,
        formData,
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeAvatar = createAsyncThunk(
  'change avatar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeCape = createAsyncThunk(
  'change cape',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-cape`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const activateEmail = createAsyncThunk(
  'send email activation code',
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/activate-email`);
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const activatePromocode = createAsyncThunk(
  'activate promocode',
  async (promocode: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activate-promocode/${promocode}`,
      );
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeUsername = createAsyncThunk(
  'set new username',
  async (newUsername: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/change-username`, {
        newUsername,
      });
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changePassword = createAsyncThunk(
  'set new password',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/change-password`, {
        currentPassword,
        newPassword,
      });
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const addPromocodes = createAsyncThunk(
  'add new promocodes',
  async (
    {
      name,
      gameCurrencyBonus,
      donateCurrencyBonus,
      amount,
    }: { name: string; gameCurrencyBonus: number; donateCurrencyBonus: number; amount: number },
    { rejectWithValue },
  ) => {
    try {
      const payload = { name, gameCurrencyBonus, donateCurrencyBonus, amount };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-promocodes`, {
        payload,
      });
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      console.log(e);
      return rejectWithValue(e.response?.data.message);
    }
  },
);
