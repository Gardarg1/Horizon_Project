'use client';

import MinecraftSkinViewer from '@/src/components/skinViewer/skin-viewer.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import defaultAvatar from '@/public/images/default-avatar.png';
import NextImage from 'next/image';
import { changeAvatar, changeCape, changeSkin } from '@/src/store/user/actions';
import Swal from 'sweetalert2';
import { LiaCoinsSolid } from 'react-icons/lia';
import { FaSackDollar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

const Cabinet = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleSkinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.src = objectUrl;

    img.onload = () => {
      if (img.width === 64 && img.height === 64) {
        const formData = new FormData();
        const updatedFile = new File([file], `${user.username}.png`);
        formData.append('skin', updatedFile);

        dispatch(changeSkin(formData))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: 'Скін успішно змінено',
              icon: 'success',
              iconColor: '#e77f2a',
              confirmButtonColor: '#e77f2a',
            });
          })
          .catch((error) => {
            Swal.fire({
              title: error.message,
              icon: 'error',
              iconColor: '#e77f2a',
              confirmButtonColor: '#e77f2a',
            });
          });
      } else {
        Swal.fire({
          title: 'Невірний розмір файла',
          text: 'Розмір скіна повинен бути 64x64 пікселів',
          icon: 'error',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        });
      }

      URL.revokeObjectURL(objectUrl);
    };
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (file) {
      const updatedFile = new File([file], `${user.username}.png`);
      formData.append('avatar', updatedFile);
      formData.append('username', user.username);

      dispatch(changeAvatar(formData))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: 'Аватар успішно змінено',
            icon: 'success',
            iconColor: '#e77f2a',
            confirmButtonColor: '#e77f2a',
          });
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: 'error',
            iconColor: '#e77f2a',
            confirmButtonColor: '#e77f2a',
          });
        });
    }
  };

  const handleCapeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        if (img.width === 64 && img.height === 32) {
          const formData = new FormData();
          const updatedFile = new File([file], `${user.username}.png`);
          formData.append('cape', updatedFile);

          dispatch(changeCape(formData))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: 'Накидку успішно змінено',
                icon: 'success',
                iconColor: '#e77f2a',
                confirmButtonColor: '#e77f2a',
              });
            })
            .catch((error) => {
              Swal.fire({
                title: error.message,
                icon: 'error',
                iconColor: '#e77f2a',
                confirmButtonColor: '#e77f2a',
              });
            });
        } else {
          Swal.fire({
            title: 'Невірний розмір файла',
            text: 'Розмір накидки повинен бути 64x32 пікселів',
            icon: 'error',
            iconColor: '#e77f2a',
            confirmButtonColor: '#e77f2a',
          });
        }
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          className={`flex transform flex-col items-center transition-all duration-1000 ease-in-out md:col-span-1 md:items-center ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <label htmlFor="avatarInput" className="cursor-pointer">
            <NextImage
              src={
                user.avatarPath
                  ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.avatarPath
                  : defaultAvatar
              }
              className="h-32 w-32 border-4 border-gray-300"
              width={128}
              height={128}
              alt="User Avatar"
            />
          </label>
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <div className="flex">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mt-4 text-2xl font-bold">{user.username}</h1>
              <span className="mt-2 rounded-2xl border border-gray-600 px-2 text-lg text-gray-500">
                {user.role}
              </span>
            </div>
            <div className="mt-4 flex space-x-6">
              {/* Currency Section */}
              <div className="ml-[20%] text-center">
                <div className="flex items-center justify-center">
                  <LiaCoinsSolid className="mr-1 h-12 w-12 text-second" />
                  <span className="text-2xl font-semibold">{user.donateCurrency}</span>
                </div>
                <p className="text-sm text-gray-500">Гривені</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-semibold">{user.gameCurrency}</span>
                  <FaSackDollar className="ml-1 h-12 w-12 pb-1 text-second" />
                </div>
                <p className="text-sm text-gray-500">Карбованці</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex transform items-center justify-end transition-all duration-1000 ease-in-out md:col-span-2 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <MinecraftSkinViewer user={user} />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row">
        <div className="my-2 md:my-0">
          <label
            htmlFor="skinInput"
            className="mx-4 cursor-pointer rounded-xl border-2 border-first px-4 py-2 font-bold text-first transition duration-300 hover:border-second hover:bg-second hover:text-white"
          >
            Загрузити скін
          </label>
          <input
            type="file"
            accept="image/png"
            id="skinInput"
            onChange={handleSkinChange}
            className="hidden"
          />
        </div>

        <div className="my-2 md:my-0">
          <label
            htmlFor="capeInput"
            className="mx-4 cursor-pointer rounded-xl border-2 border-first px-4 py-2 font-bold text-first transition duration-300 hover:border-second hover:bg-second hover:text-white"
          >
            Загрузити накидку
          </label>
          <input
            type="file"
            id="capeInput"
            accept="image/png"
            onChange={handleCapeChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
