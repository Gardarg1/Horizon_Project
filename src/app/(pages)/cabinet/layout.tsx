'use client';

import { useAppSelector } from '@/src/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CabinetLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useAppSelector((state) => state.user.data);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!user.id) {
        router.push('/');
      }
    }, 20);
  }, [router, user.id]);

  const handleBlockLiks = () => {
    Swal.fire({
      title: 'Нажаль, цей функціонал на даний момент недоступний',
      confirmButtonColor: '#e77f2a',
      iconColor: '#e77f2a',
      icon: 'warning',
    });
  };

  return (
    <div
      className="flex w-2/3 flex-col rounded-lg"
      style={{
        background:
          'radial-gradient( rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0.0) 95%)',
      }}
    >
      {user.id && (
        <>
          <div className="flex w-full items-center justify-center divide-x divide-second border-b-2 border-second font-bold">
            <Link
              href={'/cabinet'}
              className="h-full px-4 py-2 text-xl text-first transition duration-300 hover:bg-white/50 hover:shadow-xl hover:shadow-second"
            >
              {' '}
              Профіль
            </Link>
            {/* <Link href={'/cabinet/payment'} className="px-4"> */}
            <div
              className="h-full px-4 py-2 text-xl text-first transition duration-300 hover:bg-white/50 hover:shadow-xl hover:shadow-second"
              onClick={handleBlockLiks}
            >
              Привілеї
            </div>
            {/* </Link> */}
            <Link
              href={'/cabinet/opportunities'}
              className="h-full px-4 py-2 text-xl text-first transition duration-300 hover:bg-white/50 hover:shadow-xl hover:shadow-second"
            >
              Управління акаунтом
            </Link>
          </div>
          <div className="flex items-start justify-start">{children}</div>
        </>
      )}
    </div>
  );
};

export default CabinetLayout;
