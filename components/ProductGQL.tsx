import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { NextSeo } from "next-seo";
import ZaisteReactMarkdown from "./ZaisteReactMarkdown";
import { MarkdownResult } from "../utils";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="bg-white p-6">
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`https://naszsklep-api.vercel.app/api/productsGQL/${data.id}`}
          openGraph={{
            url: `https://naszsklep-api.vercel.app/api/productsGQL/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: "image/jpeg",
              },
            ],
            siteName: "SHOP-MD-J",
          }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          className="hover:border-4 border-dotted hover:translate-y-2"
          width={16}
          height={9}
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <h2 className="text-center text-blue-800 font-medium text-2xl">
        {data.title}
      </h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  return (
    <>
      <div className="bg-white p-6">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          width={16}
          height={9}
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className="p-4 grid grid-cols-1">
        <Link href={`/productsGQL/${data.id}`}>
          <a>
            <h2 className="text-center text-black font-medium text-2xl sm:h-14">
              {data.title}
            </h2>
          </a>
        </Link>
        <button
          onClick={() => {
            cartState.addItemToCart({
              id: data.id,
              price: 21.37,
              title: data.title,
              count: 1,
            });
          }}
          className="rounded-full bg-white hover:bg-violet-300 active:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 p-2 m-2"
        >
          Dodaj do koszyka
        </button>
      </div>
    </>
  );
};

export default ProductListItem;
