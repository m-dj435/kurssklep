import Rating from "./Rating";

interface Product {
  data: {
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}

const Product = ({ data }: Product) => {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <p>{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

export default Product;
