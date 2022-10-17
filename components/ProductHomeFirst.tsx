import Rating from "./Rating";

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
      <img src={data.image} />
      <p>{data.longDescription}</p>
    </>
  );
};

export default ProductDetailsHomeFirst;
