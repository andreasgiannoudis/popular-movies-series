import Link from 'next/link';
import styles from '../styles/layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/series">Series</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
