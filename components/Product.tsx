import Image from "next/image";
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
      <div className="bg-white p-6">
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
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

const ProductListItem = ({ data }: ProductListItemProps) => {
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
