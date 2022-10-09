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
    <img
      src={thumbnailUrl}
      alt={thumbnailAlt}
      className="hover:border-4 border-dotted hover:translate-y-2"
    />
    <p className="">{description}</p>
    <Rating rating={rating} />
  </>
);

export default Product;
