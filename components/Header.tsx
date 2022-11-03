import Link from "next/link";
import { useEffect, useState } from "react";
import CartBar from "./Cart/CartBar";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (showMenu && document) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showMenu]);
  return (
    <header aria-label="Site Header" className="shadow-sm">
      <div className="mx-auto max-w-screen-xl p-4 msm:relative">
        <div
          className={`flex items-center justify-between gap-4 msm:fixed msm:left-0 msm:right-0 msm:botton-0 msm:bg-slate-50 msm:min-h-screen msm:z-40 msm:top-0 ${
            !showMenu && "msm:hidden"
          }`}
        >
          <nav
            className={`gap-8 text-md font-medium md:flex msm:flex msm:flex-col msm:items-center msm:min-w-full msm:justify-around  ${
              !showMenu && "msm:hidden"
            } `}
          >
            <Link href="/aboutPage" passHref>
              <a className="text-gray-500 msm:">About</a>
            </Link>
            <Link href="/" passHref>
              <a className="text-gray-500">Main</a>
            </Link>
            <Link href="/ProductsPage" passHref>
              <a className="text-gray-500">Products</a>
            </Link>
          </nav>

          {!showMenu && <CartBar />}
        </div>
        <div className="md:hidden msm:absolute msm:top-4 msm:right-4 z-40">
          {showMenu ? (
            <button onClick={() => setShowMenu(false)}>X</button>
          ) : (
            <button
              onClick={() => setShowMenu(true)}
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
