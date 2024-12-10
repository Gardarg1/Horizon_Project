import Footer from '../components/Layout/Footer/Footer.component';
import { Montserrat } from 'next/font/google';
import StoreProvider from '../components/StoreProvider/storeProvider.component';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import 'tailwindcss/tailwind.css';
import { Header } from '../components/Layout/Header/Header.component';
import { RightBar } from '../components/Layout/RightBar/RightBar.component';

// Вызов Montserrat выносим за пределы компонента
const montserrat = Montserrat({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <GoogleTagManager gtmId="GTM-NLDFQCJH" />
      <GoogleAnalytics gaId="G-HJ6KRNLZR7" />
      <StoreProvider>
        <body
          className={
            `grid grid-cols-[1fr] grid-rows-[15rem,auto,1fr,10rem] md:grid-cols-[1fr,24rem] md:grid-rows-[40rem,1fr,24rem] ` +
            montserrat.className
          }
        >
          {/*//<!-- Google Tag Manager (noscript) -->*/}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NLDFQCJH"
              height="0"
              width="0"
              className="invisible hidden"
            ></iframe>
          </noscript>
          {/*<!-- End Google Tag Manager (noscript) -->*/}

          <Header />
          <main className="col-span-2 col-start-1 row-start-3 flex w-full items-start justify-center px-4 md:col-span-1 md:row-start-2 md:mt-24">
            {children}
          </main>
          <RightBar />
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
};

export default RootLayout;
