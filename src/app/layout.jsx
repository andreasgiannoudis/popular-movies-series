import { Roboto } from 'next/font/google';
import "../styles/globals.scss";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata = {
  title: "Movies/Series",
  description: "Created for you to discover movies and series",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
