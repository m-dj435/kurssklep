import Link from "next/link";
import Rating from "./Rating";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <img
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        className="hover:border-4 border-dotted hover:translate-y-2"
      />
      <h2 className="text-center text-blue-800 font-bold text-2xl">
        {data.title}
      </h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailUrl" | "thumbnailAlt" | "id"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <>
      <img
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        className="hover:border-4 border-dotted hover:translate-y-2"
      />
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="text-center text-blue-800 font-bold text-2xl">
            {data.title}
          </h2>
        </a>
      </Link>
    </>
  );
};

export default ProductListItem;
