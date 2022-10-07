import Rating from "./Rating";

interface ProductProps {
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

const Product = ({
  description,
  thumbnailAlt,
  thumbnailUrl,
  rating,
}: ProductProps) => (
  <>
    <img src={thumbnailUrl} alt={thumbnailAlt} />
    <p>{description}</p>
    <Rating rating={rating} />
  </>
);

export default Product;
