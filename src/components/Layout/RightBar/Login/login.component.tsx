'use client';

import { forgotPassword, login } from '@/src/store/user/actions';
import { useAppDispatch } from '@/src/store/store';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';
import Link from 'next/link';
import Swal from 'sweetalert2';
import styles from './styles.module.css';
import { MyInput } from '@/src/components/Custom/input/myInput.component';
import { useEffect, useState } from 'react';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';

interface Values {
  username: string;
  password: string;
}

const LoginSchema = object().shape({
  username: string()
    .min(4, 'Логін ззанадто короткий')
    .max(50, 'Логін занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
  password: string()
    .min(4, 'Пароль занадто короткий')
    .max(50, 'Пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const inputClass = 'w-full';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Уведіть ваш email',
      input: 'email',
      inputPlaceholder: 'example@email.com',
      color: '#e77f2a',
      inputAutoFocus: true,
      confirmButtonColor: '#fbbd8b',
      customClass: {
        input: `${styles.emailInput}`,
      },
    });
    if (email) {
      dispatch(forgotPassword(email))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: 'Лист відправлено вам на пошту',
            confirmButtonColor: '#e77f2a',
            icon: 'success',
            iconColor: '#e77f2a',
          });
        });
    }
  };

  return (
    <div
      className={`relative mx-4 flex transform items-center justify-center rounded-b-3xl bg-white px-4 font-bold transition-transform duration-300 ease-in-out md:rounded-[2rem] md:px-6 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <span className="absolute -top-5 left-0 right-0 mx-auto w-full rounded-t-3xl bg-fourth px-2 py-1 text-center text-white md:w-2/3 md:rounded-[2rem]">
        Авторизація
      </span>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values: Values) => {
          dispatch(login({ username: values.username, password: values.password }))
            .unwrap()
            .then(async () => {})
            .catch((rejectedValueOrSerializedError) => {
              Swal.fire({
                title: rejectedValueOrSerializedError,
                confirmButtonColor: '#e77f2a',
                icon: 'error',
                iconColor: '#e77f2a',
              });
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-4 flex w-full flex-col items-center justify-center py-6">
            <MyInput
              className={inputClass}
              type="text"
              placeholder="Логін"
              name="username"
              errorStyle="hidden"
              icon={<RiMapPinUserLine color="#FAFAFA" className="mr-1 h-6 w-6" />}
            />
            <MyInput
              containerStyle="mt-4"
              inputStyle={inputClass}
              type="password"
              placeholder="Пароль"
              name="password"
              label=""
              errorStyle="hidden"
              icon={<RiLock2Line color="#FAFAFA" className="mr-2 h-6 w-6" />}
            />
            <div className="my-2 flex w-full justify-end" onClick={handleForgotPassword}>
              <span
                onClick={handleForgotPassword}
                className="cursor-pointer text-sm text-gray-300 underline"
              >
                Забули пароль?
              </span>
            </div>
            <div className="mb-4 flex w-full items-center justify-center">
              <Link href="/register">
                <MyButton className="my-2 mr-2 min-w-36 rounded-[2rem] px-6 py-2">
                  <span>Реєстрація</span>
                </MyButton>
              </Link>
              <MyButton type="submit" className="my-2 ml-2 min-w-36 rounded-[2rem] px-6 py-2">
                <span>Увійти</span>
              </MyButton>
            </div>
            {errors.username && touched.username ? (
              <ErrorMessage name="username">
                {() => <div className="text-first">{"Логін є обов'язковим полем"}</div>}
              </ErrorMessage>
            ) : errors.password && touched.password ? (
              <ErrorMessage name="password" className="text-first">
                {() => <div className="text-first">{"Пароль є обов'язковим полем"}</div>}
              </ErrorMessage>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};
