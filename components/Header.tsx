import Link from "next/link";

const Header = () => {
  return (
    <header className="max-w-md mx-auto w-full">
      <nav className="bg-gray-700 px-4 py-2 text-white text-center ">
        NavBar
      </nav>
      <Link href="/" passHref>
        <a className="hover:text-blue-700 hover:underline hover:bg-white">
          Main
        </a>
      </Link>
      <Link href="/aboutPage" passHref>
        <a className="hover:text-blue-700 hover:underline hover:bg-white">
          About
        </a>
      </Link>
    </header>
  );
};

export default Header;
