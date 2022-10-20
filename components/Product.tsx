import Link from "next/link";
import Rating from "./Rating";
import Image from "next/image";

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}
export interface Rating {
  rate: number;
  count: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <Image
        src={data.image}
        alt=""
        layout="responsive"
        width={14}
        height={9}
      />
      <h2 className="text-center text-blue-800 font-bold text-2xl">
        {data.title}
      </h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating.rate} />
    </>
  );
};

type ProductListItem = Pick<ProductDetails, "title" | "image" | "price" | "id">;

interface ProductListItemProps {
  data: ProductListItem;
}

const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <>
      <h3 className="text-red-300">{data.id}</h3>
      <Image
        src={data.image}
        alt=""
        layout="responsive"
        width={14}
        height={9}
      />
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="text-center text-blue-800 font-bold text-2xl">
            {data.title}
          </h2>
        </a>
      </Link>
      <p className="flex justify-center">cena: {data.price} zł</p>
    </>
  );
};

export default ProductListItem;
