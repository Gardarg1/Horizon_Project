import React from 'react';
import defaultImg from '@/public/images/defaultPostsImg.png';
import Image from 'next/image';

interface ServerInfoProps {
  title: string;
  subtitle: string;
  gameVersion: string;
  mainWorldSize: string;
  netherSize: string;
  endWorldSize: string;
  pvpStatus: string;
  description: string;
  imageSrc: string;
}

const ServerInfo: React.FC<ServerInfoProps> = ({
  title,
  subtitle,
  gameVersion,
  mainWorldSize,
  netherSize,
  endWorldSize,
  pvpStatus,
  description,
}) => {
  return (
    <div className="d relative mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={defaultImg.src}
          alt={title}
          width={400}
          height={400}
          className="max-h-80 w-full rounded-t-lg object-cover"
        />
        <div className="absolute inset-0 rounded-t-lg bg-black opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>

      {/* Server Stats Section */}
      <div className="absolute left-0 right-0 top-1/2 mx-auto flex h-24 w-[90%] justify-around divide-x-2 divide-second rounded-xl rounded-b-lg bg-gray-100 py-4 shadow-xl">
        <div className="px-4 text-center">
          <p className="font-bold">{gameVersion}</p>
          <p>Версія гри</p>
        </div>
        <div className="px-4 text-center">
          <p className="font-bold">{mainWorldSize}</p>
          <p>Розмір основного світу</p>
        </div>
        <div className="px-4 text-center">
          <p className="font-bold">{netherSize}</p>
          <p>Розмір пекла</p>
        </div>
        <div className="px-4 text-center">
          <p className="font-bold">{endWorldSize}</p>
          <p>Розмір ендер світу</p>
        </div>
        <div className="px-4 text-center">
          <p className="font-bold text-red-500">{pvpStatus}</p>
          <p>PVP режим</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-6">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ServerInfo;

{
  /* <CircularProgressbarWithChildren
          value={server.playersNow}
          text={`${server.playersNow}`}
          strokeWidth={8}
          maxValue={100}
          styles={buildStyles({
            rotation: 1,
            textColor: '#e77f2a',
            pathColor: `#e77f2a`,
            trailColor: '#fbbd8b',
          })}
        /> */
}
