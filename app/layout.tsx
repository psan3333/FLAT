import { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google';
import Navbar from "./components/navbar/Navbar";
import InfoFooter from './components/InfoFooter';
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata: Metadata = {
  description: "AirBNB clone",
  // icons: {
  //   shortcut: '/icon.ico',
  // },
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      {/* <Head>
        <link rel="shortcut icon" href="/app/icon.ico" />
      </Head> */}
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-24">

        </div>
        <div>
          {children}
        </div>
        <InfoFooter/>
      </body>
    </html>
  );
}
