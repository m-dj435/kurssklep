import Link from "next/link";
import Rating from "./Rating";
import Image from "next/image";

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
      <Image
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        layout="responsive"
        width={16}
        height={9}
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
      <Image
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        layout="responsive"
        width={16}
        height={9}
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
