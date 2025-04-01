import type { Metadata } from "next";
import "@/styles/app.scss";
import styles from './layout.module.scss';
import LayoutNav from '@/modules/ui/layout-nav/layout-nav.component';

export const metadata: Metadata = {
  title: "Mangrove Liquidity Position Demo",
  description: "Not much more than just a Mangrove Liquidity Position Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/fonts/Axiforma-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
        <link rel="preload" href="/assets/fonts/Axiforma-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
        <link rel="preload" href="/assets/example.png" as="image" type="image/png" crossOrigin="anonymous"/>
        <link rel="preload" href="/assets/logo.svg" as="image" type="image/svg+xml" crossOrigin="anonymous"/>
      </head>
      <body className={styles['layout']}>
        <nav className={styles['layout-nav']}>
          <LayoutNav/>
        </nav>
        <main className={styles['layout-content']}>
          {children}
        </main>
      </body>
    </html>
  );
}
