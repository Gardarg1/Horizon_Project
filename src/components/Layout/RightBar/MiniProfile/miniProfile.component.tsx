'use client';

import { useEffect, useState } from 'react';
import { RiUserLine, RiSparkling2Line } from 'react-icons/ri';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LiaCoinsSolid } from 'react-icons/lia';
import { FaSackDollar } from 'react-icons/fa6';
import { AiOutlineSetting } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { logout } from '@/src/store/user/actions';
import Link from 'next/link';
import Image from 'next/image';
import defaultAvatar from '@/public/images/default-avatar.png';
import Swal from 'sweetalert2';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';

export const MiniProfile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const line = 'relative flex my-0.5 text-gray-600 text-center w-full';
  const lineImg = 'absolute -left-2 w-6 h-6';

  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBlockLiks = () => {
    Swal.fire({
      title: 'Нажаль, цей функціонал на даний момент недоступний',
      confirmButtonColor: '#e77f2a',
      iconColor: '#e77f2a',
      icon: 'warning',
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  return (
    <div
      className={`relative mx-4 flex min-w-[21rem] transform items-center justify-center rounded-b-3xl bg-white px-4 font-bold transition-transform duration-300 ease-in-out md:rounded-[2rem] md:px-10 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <span className="absolute -top-5 left-0 right-0 mx-auto w-full rounded-t-3xl bg-fourth px-2 py-1 text-center text-white md:w-2/3 md:rounded-[2rem]">
        Профіль
      </span>
      <div className="flex w-full flex-col items-start justify-center py-6">
        <span className="text-orange w-full text-center text-xl">
          {user.username.toUpperCase()}
        </span>
        <div className="flex w-full md:flex-col md:items-center md:justify-center">
          <div className="text- my-2 flex w-full items-center justify-start md:justify-center">
            <Image
              src={
                user.avatarPath
                  ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.avatarPath
                  : defaultAvatar
              }
              className="h-24 w-24"
              alt=""
              width={400}
              height={400}
            />
          </div>
          <div className="my-2 flex w-full items-center justify-center text-center">
            <div className="mx-4 flex flex-col">
              <div className="flex items-center justify-center text-xl">
                <LiaCoinsSolid className="mr-1 h-10 w-10" color="#DEBC8E" />
                <span className="text-3xl">{user.donateCurrency}</span>
              </div>
              <span className="text-sm text-gray-500">Гривені</span>
            </div>
            <div className="mx-4 flex flex-col">
              <div className="flex items-center justify-center text-center text-xl">
                <span className="text-3xl">{user.gameCurrency}</span>
                <FaSackDollar className="ml-1 h-10 w-10" color="#DEBC8E" />
              </div>
              <span className="text-sm text-gray-500">Карбованці</span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row text-xs md:flex-col md:text-lg">
          <Link href={`/cabinet`}>
            <div className={line}>
              <RiUserLine className={lineImg} color="#DEBC8E" />
              <span className="w-full text-center">Особистий кабінет</span>
            </div>
          </Link>

          <div className={line} onClick={handleBlockLiks}>
            <IoDiamondOutline className={lineImg} color="#DEBC8E" />
            <span className="w-full text-center">Поповнення балансу</span>
          </div>

          <div className={line} onClick={handleBlockLiks}>
            <BsCurrencyDollar className={lineImg} color="#DEBC8E" />
            <span className="w-full text-center">Магазин переваг</span>
          </div>
          <div className={line} onClick={handleBlockLiks}>
            <MdOutlineShoppingCart className={lineImg} color="#DEBC8E" />
            <span className="w-full text-center">Магазин ресурсів</span>
          </div>
          <Link href={`/cabinet/opportunities`}>
            <div className={line}>
              <RiSparkling2Line className={lineImg} color="#DEBC8E" />
              <span className="w-full text-center">Задіяти промокод</span>
            </div>
          </Link>
          <Link href={`/cabinet/opportunities`}>
            <div className={line}>
              <AiOutlineSetting className={lineImg} color="#DEBC8E" />
              <span className="w-full text-center">Додатково</span>
            </div>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          <MyButton
            className="bg-orange mt-4 rounded-3xl px-8 py-2 text-xl hover:text-white"
            onClick={handleLogout}
          >
            <span>Вихід</span>
          </MyButton>
        </div>
      </div>
    </div>
  );
};
