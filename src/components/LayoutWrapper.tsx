'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/area-riservata');

  return (
    <>
      {!isAdmin && <Header />}
      <main className={isAdmin ? '' : 'flex-grow'}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
