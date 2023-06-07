import { FC } from "react";
import Head from "next/head";
import { Navbar, Sidemenu } from '../ui';

interface Props {
  title: string;
  children: any;
}

export const ReviewLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/darktheme.png"></link>
      </Head>
      <nav>
        {/* TODO: Navbar */}
        <Navbar />
      </nav>

      <Sidemenu />

      <main
        style={{
          margin: "80px auto",
          maxHeight: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>
      {/* TODO: footer */}
      <footer></footer>
    </>
  );
};
