import Rating from "./Rating";
import Image from "next/image";
interface ProductDetailsHomeFirst {
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
  data: ProductDetailsHomeFirst;
}

const ProductDetailsHomeFirst = ({ data }: ProductProps) => {
  return (
    <>
      <p>{data.id}</p>
      <h2>{data.title}</h2>
      <p>{data.price}</p>
      <p className="p-4">{data.description}</p>
      <p>{data.category}</p>
      <Rating rating={data.rating.rate} />
      <Image
        src={data.image}
        layout="responsive"
        width={16}
        height={9}
        alt=""
      />
      <p>{data.longDescription}</p>
    </>
  );
};

export default ProductDetailsHomeFirst;
