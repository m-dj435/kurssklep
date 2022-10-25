import Link from "next/link";
import CartBar from "./Cart/CartBar";

const Header = () => {
  return (
    <header className="mx-auto w-full px-4 flex items-center justify-between bg-gray-700">
      <nav className="py-2 text-white text-center ">
        <Link href="/" passHref>
          <a className="hover:text-blue-700 hover:underline hover:bg-white px-2">
            Main
          </a>
        </Link>
        <Link href="/aboutPage" passHref>
          <a className="hover:text-blue-700 hover:underline hover:bg-white px-2">
            About
          </a>
        </Link>
      </nav>
      <CartBar />
    </header>
  );
};

export default Header;
