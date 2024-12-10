'use client';

import { MyInput } from '@/src/components/Custom/input/myInput.component';
import { signup } from '@/src/store/user/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { FiMail } from 'react-icons/fi';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string, ref } from 'yup';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';
import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';

interface Values {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const RegistrationSchema = object().shape({
  username: string()
    .min(4, 'Логін занадто короткий')
    .max(50, 'Логін занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
  password: string()
    .min(4, 'Пароль занадто короткий')
    .max(50, 'Пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
  email: string()
    .min(4, 'Email занадто короткий')
    .max(50, 'Email занадто довгий')
    .email()
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}@._-]+$/gu, 'Заборонені знаки!')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password'), ''], 'Паролі не співпадають')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
});

const Registration = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const container = useRef(null);

  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    if (user.id) {
      router.push('/');
    }
  });

  const inputClass = '';
  const containerClass = 'my-1 ';

  const onSubmit = ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) => {
    dispatch(signup({ username: username, password: password, email: email }))
      .unwrap()
      .then(async () => {
        Swal.fire({
          title: 'Реєстрація успішна\nПідтвердіть ваш email, будь ласка.',
          text: 'Також ви це можеет зробити в будь який момент в особистому кабінеті',
          icon: 'success',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        }).then(() => {
          router.push('/');
        });
      })
      .catch((rejectedValueOrSerializedError) => {
        Swal.fire({
          title: rejectedValueOrSerializedError,
          confirmButtonColor: '#e77f2a',
          icon: 'error',
          iconColor: '#e77f2a',
        });
      });
  };

  return (
    <div
      className="relative mx-4 flex items-center justify-center rounded-b-3xl bg-white font-bold md:rounded-[2rem]"
      ref={container}
    >
      <span className="absolute -top-5 left-0 right-0 mx-auto w-full rounded-t-3xl bg-fourth px-2 py-1 text-center text-white md:w-2/3 md:rounded-[2rem]">
        Реєстрація
      </span>
      {!user.id ? (
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
          }}
          validationSchema={RegistrationSchema}
          onSubmit={(values: Values) => {
            onSubmit({ username: values.username, email: values.email, password: values.password });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center justify-center pt-12 md:w-full md:px-8 md:py-6">
              <div className="flex">
                <div className="mx-4 flex flex-col">
                  <MyInput
                    inputStyle={inputClass}
                    containerStyle={containerClass}
                    type="text"
                    placeholder="Логін"
                    name="username"
                    errorStyle="hidden"
                    icon={<RiMapPinUserLine color="#FAFAFA" className="mr-1 h-6 w-6" />}
                  />
                  <MyInput
                    inputStyle={inputClass}
                    containerStyle={containerClass}
                    type="email"
                    placeholder="email@email.com"
                    name="email"
                    errorStyle="hidden"
                    icon={<FiMail color="#FAFAFA" className="mr-1 h-6 w-6" />}
                  />
                </div>
                <div className="mx-4 flex flex-col">
                  <MyInput
                    inputStyle={inputClass}
                    containerStyle={containerClass}
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    label=""
                    errorStyle="hidden"
                    icon={<RiLock2Line color="#FAFAFA" className="mr-1 h-6 w-6" />}
                  />
                  <MyInput
                    inputStyle={inputClass}
                    containerStyle={containerClass}
                    type="password"
                    placeholder="Повторіть пароль"
                    name="confirmPassword"
                    label=""
                    errorStyle="hidden"
                    icon={<RiLock2Line color="#FAFAFA" className="mr-1 h-6 w-6" />}
                  />
                </div>
              </div>

              <div className="mb-4 flex w-full items-center justify-center">
                <MyButton type="submit" className="mt-4 rounded-2xl px-4 py-2">
                  <span>Зареєеструватись</span>
                </MyButton>
              </div>
              {errors.username && touched.username ? (
                <ErrorMessage name="username">
                  {(msg) => <div className="text-first">{msg}</div>}
                </ErrorMessage>
              ) : errors.password && touched.password ? (
                <ErrorMessage name="password" className="text-first">
                  {(msg) => <div className="text-first">{msg}</div>}
                </ErrorMessage>
              ) : errors.confirmPassword && touched.confirmPassword ? (
                <ErrorMessage name="confirmPassword" className="text-first">
                  {(msg) => <div className="text-first">{msg}</div>}
                </ErrorMessage>
              ) : errors.email && touched.email ? (
                <ErrorMessage name="email" className="text-first">
                  {(msg) => <div className="text-first">{msg}</div>}
                </ErrorMessage>
              ) : null}
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex items-center justify-center p-40 text-3xl">
          Ця сторінка недоступна зареєстрованим користувачам
        </div>
      )}
    </div>
  );
};

export default Registration;
