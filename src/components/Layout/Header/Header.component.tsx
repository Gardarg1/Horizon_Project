'use client';

import Hero from '/public/images/circle.png';
import Logo from '/public/images/Logo.svg';
import TelegramLogo from '/public/images/telegramLogo.png';
import DiscordLogo from '/public/images/discordLogo.png';
import WindowsLogo from '/public/images/windowsLogo.png';
import LinuxAndAppleLogo from '/public/images/linux&appleLogo.png';
import NavBar from '../NavBar/NavBar.component';
import Image from 'next/image';
import Swal from 'sweetalert2';

export const Header = () => {
  const textShadow = '[text-shadow:_2px_4px_rgb(222,_188,_142)]';
  const button =
    'flex bg-white px-4 py-2 w-full shadow-lg border-orange border-b-2 border-r-2 rounded-3xl mb-4';

  const handleDownload = () => {
    Swal.fire({
      title: 'Завантаження поки що недоступне',
      icon: 'warning',
      iconColor: '#e77f2a',
      confirmButtonColor: '#e77f2a',
    });
  };

  return (
    <header className={`col-span-2 grid-cols-3 grid-rows-[1fr,8rem] gap-4 py-4 md:grid`}>
      <div className={`hidden items-center md:flex`}>
        <Image className={''} src={Hero} alt={'Woops'} />
        <div className={`flex flex-col text-white ${textShadow} text-4xl`}>
          <span className="font-light">Приєднуйся до гри </span>
          <span className="font-bold">ПРЯМО ЗАРАЗ!</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image className={'h-36 w-36 md:h-96 md:w-96'} src={Logo} alt={'Woops'} />
      </div>
      <div className="flex grid-cols-2 grid-rows-[4rem,1fr] md:grid">
        <div className="absolute top-0 col-span-2 col-start-2 justify-self-end md:flex">
          <Image
            className={'mx-4 mt-4 h-5 w-7 hover:cursor-pointer md:h-10 md:w-14'}
            src={DiscordLogo}
            alt={'Woops'}
          />
          <Image
            className={'mx-4 mr-12 mt-4 h-6 w-6 hover:cursor-pointer md:h-12 md:w-12'}
            src={TelegramLogo}
            alt={'Woops'}
          />
        </div>
        <div className="col-span-1 col-start-1 row-start-2 hidden flex-col items-center justify-center self-start md:flex">
        <span className={`text-xl text-white ${textShadow} mb-4`}>ЗАВАНТАЖУЙ ЛАУНЧЕР!</span>

        {/* Windows Download Button */}
        <a href="https://launch.ukraine-horizon.online/Launcher.exe" download className={`${button}`}>

            <Image className={`h-16 w-20`} src={WindowsLogo} alt={'Woops'} />
            <span className="w-full text-center text-second">
              Версія для
              <br />
              Windows 32/64 bit
            </span>

        </a>

        {/* Linux/Mac Download Button */}
        <a href="https://launch.ukraine-horizon.online/Launcher.jar" download className={`${button}`}>
            <Image className={`h-16 w-20`} src={LinuxAndAppleLogo} alt={'Woops'} />
            <span className="w-full text-center text-second">
              Версія для
              <br />
              Linux / Mac O
            </span>
        </a>
      </div>

      </div>
      <NavBar />
    </header>
  );
};
