import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from '../styles/footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <h2>Popular Movies & Series</h2>
          <p>&copy; 2024 All rights reserved.</p>
        </div>
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/series">Series</Link></li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <div className={styles.icons}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Email: support@example.com</p>
        </div>
        <div className={styles.credits}>
          <h3>Credits</h3>
          <p>Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
