import Link from "next/link";

const Header = () => {
  return (
    <header className="max-w-md mx-auto w-full">
      <nav className="bg-gray-700 px-4 py-2 text-white">NavBar</nav>
      <Link href="/" passHref>
        <a>Main </a>
      </Link>
      <Link href="/aboutPage" passHref>
        <a> About</a>
      </Link>
    </header>
  );
};

export default Header;
