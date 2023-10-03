import './styles/variables.css';
import './styles/reset.css';
import './styles/grid.css';
import './styles/flex.css';
import './styles/spacing.css';
import './styles/type.css';
import header from './styles/header.module.css';
import footer from './styles/footer.module.css';
import './styles/buttonsLinks.css';
import styles from './layout.module.css';
import Link from 'next/link';
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
        <div className={'fullWidthWithMargins'}>
          <header className={`gridColumnCenter ${header.container}`}>
            <div className={'flexSpaceBetween'}>
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
        <div className={`fullWidthWithMargins ${styles.main}`}>{children}</div>
        <footer className={`fullWidthWithMargins ${footer.wrapper}`}></footer>
      </body>
    </html>
  );
}
