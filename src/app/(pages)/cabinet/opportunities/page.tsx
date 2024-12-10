'use client';

import { AddNewPromocodes } from '@/src/components/AddNewPromocodes/addNewPromocodes.component';
import { MyInput } from '@/src/components/Custom/input/myInput.component';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import {
  activateEmail,
  activatePromocode,
  changePassword,
  changeUsername,
} from '@/src/store/user/actions';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Opportunities = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const [promocode, setPromocode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');

  // State to control animation visibility
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for a smooth effect
  }, []);

  const handleActivateEmail = () => {
    dispatch(activateEmail())
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Посилання активації відправлено вам на пошту',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
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

  const handleSendPromocode = () => {
    dispatch(activatePromocode(promocode))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Промокод успішно застосовано',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
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
    setPromocode('');
  };

  const handleSetNewUsername = () => {
    dispatch(changeUsername(newUsername))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Логін успішно змінено',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
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
    setNewUsername('');
  };

  const handleSetNewPassword = () => {
    dispatch(changePassword({ newPassword: newPassword, currentPassword: currentPassword }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Пароль успішно змінено',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
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
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full items-center justify-center">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={() => {}}
        >
          {/* Apply the sliding animation using Tailwind and conditional classes */}
          <Form
            className={`my-8 w-full max-w-lg transform rounded-xl bg-white p-6 shadow-md transition-all duration-1000 ease-in-out ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Налаштування користувача
            </h1>

            {/* Change Username */}
            <div className="mb-4 flex flex-col">
              <label className="mb-2 text-gray-600">Змінити логін</label>
              <div className="flex items-center">
                <MyInput
                  name="username"
                  containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <MyButton
                  onClick={handleSetNewUsername}
                  className="ml-4 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  <span>Готово</span>
                </MyButton>
              </div>
            </div>

            {/* Change Password */}
            <div className="mb-4 flex flex-col">
              <label className="mb-2 text-gray-600">Змінити пароль</label>
              <div className="flex items-center space-x-2">
                <MyInput
                  name="current-password"
                  containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Ваш пароль"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <MyInput
                  name="new-password"
                  containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Новий пароль"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <MyButton
                  onClick={handleSetNewPassword}
                  className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  <span>Готово</span>
                </MyButton>
              </div>
            </div>

            {/* Apply Promocode */}
            <div className="mb-4 flex flex-col">
              <label className="mb-2 text-gray-600">Увести промокод</label>
              <div className="flex items-center">
                <MyInput
                  name="promocode"
                  containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  type="text"
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                />
                <MyButton
                  onClick={handleSendPromocode}
                  className="ml-4 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  <span>Готово</span>
                </MyButton>
              </div>
            </div>

            {!user.isActivated && (
              <MyButton
                onClick={handleActivateEmail}
                className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                <span>Активувати почту </span>
              </MyButton>
            )}

            {user.role === 'admin' && (
              <div className="mt-6 flex justify-between">
                <AddNewPromocodes />
                <Link href="/posts/new-post">
                  <MyButton className="ml-4 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                    <span>Додати новий пост</span>
                  </MyButton>
                </Link>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Opportunities;
