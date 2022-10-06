import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <p className="text-5xl font-bold text-center text-red-500 mt-6 border-8 rounded-3xl border-green-300 shadow-lg shadow-pink-400">
        Hej
      </p>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
