import { useGetReviewForProductSlugQuery } from "../../genetated/graphql";
import { ProductReviewItem } from "./ProductReviewListItem";

export interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data, loading, error, client } = useGetReviewForProductSlugQuery({
    variables: {
      slug: productSlug,
    },
  });
  if (!data) {
    return null;
  }
  return (
    <ul>
      {data.product?.reviews.map((review, i) => (
        <ProductReviewItem key={review.id} review={review} index={i} />
      ))}
    </ul>
  );
};
