'use client';

import { MyInput } from '@/src/components/Custom/input/myInput.component';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';
import { useAppDispatch } from '@/src/store/store';
import { checkResetToken, resetPassword } from '@/src/store/user/actions';
import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { object, ref, string } from 'yup';

const RegistrationSchema = object().shape({
  password: string()
    .min(4, 'Пароль занадто короткий')
    .max(50, 'Пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),

  confirmPassword: string()
    .oneOf([ref('password'), ''], 'Паролі не співпадають')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required(),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else {
      dispatch(checkResetToken(token))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => {
          Swal.fire({
            title: 'Термін дії токена минув або він неправильний',
            confirmButtonColor: '#e77f2a',
            icon: 'error',
            iconColor: '#e77f2a',
          }).then(() => router.push('/'));
        });
    }
  }, [dispatch, router, token]);

  const handleSubmit = ({
    newPassword,
    newPasswordConfirmation,
  }: {
    newPassword: string;
    newPasswordConfirmation: string;
  }) => {
    if (newPassword === newPasswordConfirmation && token) {
      dispatch(resetPassword({ token: token, password: newPassword }))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: 'Новий пароль успішно встановлено',
            confirmButtonColor: '#e77f2a',
            icon: 'success',
            iconColor: '#e77f2a',
          }).then(() => router.push('/'));
        })
        .catch((rejectedValueOrSerializedError) => {
          Swal.fire({
            title: rejectedValueOrSerializedError,
            confirmButtonColor: '#e77f2a',
            icon: 'error',
            iconColor: '#e77f2a',
          });
        });
    } else {
      Swal.fire({
        title: 'Паролі не співпадають',
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      });
    }
  };

  return !loading ? (
    <div className="mb-24 flex flex-col items-center justify-center rounded-3xl bg-white p-6">
      <h1 className="mx-2 mb-2 text-2xl text-first">Відновлення паролю</h1>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={(values: { password: string; confirmPassword: string }) => {
          handleSubmit({
            newPassword: values.password,
            newPasswordConfirmation: values.confirmPassword,
          });
        }}
      >
        {() => (
          <Form>
            <div className="mt-4 flex flex-col">
              <MyInput
                name="password"
                type="password"
                placeholder="Уведіть новий пароль"
                errorStyle="h-8"
              />
              <MyInput
                name="confirmPassword"
                type="password"
                placeholder="Повторіть новий пароль"
                errorStyle="h-8"
              />
            </div>
            <MyButton type="submit" className="mt-4 rounded-xl px-4 py-2">
              <span>Встановити новий пароль</span>
            </MyButton>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ResetPassword;
