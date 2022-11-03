import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-purple-200 to-gray-200">
      <Head>
        <title> SHOP-MDJ </title>
        <meta name="description" content="Shop Outlet" />
      </Head>
      <Header />
      <div className="flex-grow pt-4">{children}</div>
      {/* <Main>
        <ProductDetails data={DATA} />
      </Main> */}
      <Footer />
    </div>
  );
};

export default Layout;
