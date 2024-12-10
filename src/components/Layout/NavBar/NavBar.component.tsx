'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { CastleIcon } from '@/public/icons/castle'; // Replace with actual path
import { BalanceIcon } from '@/public/icons/balance'; // Replace with actual path
import { CrystalIcon } from '@/public/icons/crystal'; // Replace with actual path
import { CartIcon } from '@/public/icons/cart'; // Replace with actual path

export default function NavBar() {
  const navItem = 'relative md:mx-4 mx-1 flex justify-center items-center';
  const selectedNavTest = `border-b-4 border-[#e77f2a] ml-2`;
  const textShadow = 'md:[text-shadow:_2px_4px_rgb(222,_188,_142)]';
  const after =
    'ml-2 after:origin-center after:duration-700 hover:after:block after:w-0 after:h-1 hover:after:bg-[#e77f2a] hover:after:absolute hover:after:-translate-x-1/2 hover:after:w-full hover:after:left-1/2';

  const router = usePathname();

  const handleBlockLinks = () => {
    Swal.fire({
      title: 'Нажаль, цей функціонал на даний момент недоступний',
      confirmButtonColor: '#e77f2a',
      iconColor: '#e77f2a',
      icon: 'warning',
    });
  };
  return (
    <nav
      className={`col-start-2 row-span-3 flex items-center justify-center text-white ${textShadow} text-2xl md:text-5xl`}
    >
      <Link className={navItem} href="/">
        <CastleIcon fill="#F1861C" width="32" height="32" />
        <span className={`${router === '/' ? selectedNavTest : after} `}>Головна</span>
      </Link>
      <Link className={navItem} href="/rules">
        <BalanceIcon fill="#F1861C" width="32" height="32" />
        <span className={`${router === '/rules' ? selectedNavTest : after}`}>Правила</span>
      </Link>
      <Link className={navItem} href="/servers">
        <CrystalIcon fill="#F1861C" width="32" height="32" />
        <span className={`${router === '/servers' ? selectedNavTest : after}`}>Сервери</span>
      </Link>
      <div className={navItem} onClick={handleBlockLinks}>
        <CartIcon fill="#F1861C" width="32" height="32" />
        <span className={`${router === '/shop' ? selectedNavTest : after}`}>Магазин</span>
      </div>
    </nav>
  );
}
