import './styles/globals.css';
import grid from './styles/grid.module.css';
import flex from './styles/flex.module.css';
import header from './styles/header.module.scss';
import footer from './styles/footer.module.scss';
import styles from './layout.module.scss';
import Link from 'next/link';
import Head from 'next/head';
import { LogoSliced } from '@/images/logos/LogoSliced';

export const metadata = {
  title: 'Sliced - Recipes',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={grid.fullWidthWithMargins}>
          <header className={`${grid.gridColumnCenter} ${header.container}`}>
            <div className={flex.flexSpaceBetween}>
              <Link href="/" className={header.logoWrapper}>
                <LogoSliced />
              </Link>
              <img
                className={header.logo}
                src={'/logo-slices.svg'}
                alt="Slices logo"
              />
            </div>
            <img className={header.furl} src={'/furl.svg'} alt="" />
          </header>
        </div>
        <div className={`${grid.fullWidthWithMargins} ${styles.main}`}>
          {children}
        </div>
        <footer
          className={`${grid.fullWidthWithMargins} ${footer.wrapper}`}
        ></footer>
      </body>
    </html>
  );
}
