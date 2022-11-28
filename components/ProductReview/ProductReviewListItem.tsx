import { ReviewContentFragment } from "../../genetated/graphql";

export interface ProductReviewItemProps {
  review: ReviewContentFragment;
  index: number;
}

export const ProductReviewItem = ({
  review,
  index,
}: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith("-");
  return (
    <li
      className={`border m-4 bg-white p-2 max-w-md mx-auto shadow-xl rounded-xl ${
        isOptimistic ? "opacity-50" : ""
      }`}
    >
      <div className="text-center text-gray-400">-{index + 1}-</div>
      <h3 className="flex">
        <div className="text-red-600">Headline:</div>{" "}
        <div className="italic pl-4">{review.headline}</div>
      </h3>
      <div className="flex">
        <div className="text-red-600">Rating:</div>
        <div className="italic pl-8">{review.rating}/5</div>
      </div>
      <p className="flex">
        <div className="text-red-600">Content:</div>
        <div className=" italic pl-4">{review.content}</div>
      </p>
      <footer className="grid justify-items-stretch">
        <div className="italic justify-self-end "> {review.name}</div>
      </footer>
    </li>
  );
};
