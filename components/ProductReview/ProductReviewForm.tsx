import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import {
  CreateProductReviewDocument,
  GetReviewForProductSlugDocument,
  GetReviewForProductSlugQuery,
  useCreateProductReviewMutation,
} from "../../genetated/graphql";
import ProductSlugPage from "../../pages/productsGQL/[productSlug]";

export const reviewForSchema = yup.object({
  content: yup.string().required(),
  headline: yup.string().required(),
  name: yup.string().required(),
  rating: yup.number().min(1).max(5).required(),
  email: yup.string().email().required("Adres e-maill nie jest poprawny"),
});

type ReviewFormData = yup.InferType<typeof reviewForSchema>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const { register, handleSubmit } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewForSchema),
  });

  const [createReview, { loading, error, data }] =
    useCreateProductReviewMutation({
      update(cache, result) {
        const originalReviewsQuery =
          cache.readQuery<GetReviewForProductSlugQuery>({
            query: GetReviewForProductSlugDocument,
            variables: { slug: productSlug },
          });
        if (!originalReviewsQuery?.product || !result.data?.review) {
          //...
          return;
        }

        const newReviewsQuery = {
          ...originalReviewsQuery,
          product: {
            ...originalReviewsQuery.product,
            reviews: [
              ...originalReviewsQuery.product.reviews,
              result.data.review,
            ],
          },
        };
        console.log(newReviewsQuery);
        cache.writeQuery({
          query: GetReviewForProductSlugDocument,
          variables: { slug: productSlug },
          data: newReviewsQuery,
        });
      },
    });

  const onSubmit = handleSubmit((data) => {
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(),
          ...data,
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="m-4 max-w-md mx-auto ">
      <label>
        headline
        <input
          required
          type="text"
          {...register("headline")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
          placeholder="Enter your headline"
        />
      </label>

      <label>
        rating
        <input
          required
          type="number"
          {...register("rating")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
          placeholder="Enter your rating form 0 to 5"
        />
      </label>
      <label>
        content
        <input
          required
          type="text"
          {...register("content")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
          placeholder="Enter your content"
        />
      </label>
      <label>
        name
        <input
          required
          type="text"
          {...register("name")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
          placeholder="Enter your name"
        />
      </label>
      <label>
        email
        <input
          required
          type="email"
          {...register("email")}
          className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
          placeholder="Enter your email"
        />
      </label>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:bg-blue-400 transition duration-150 ease-in-out"
          type="submit"
        >
          Dodaj komentarz
        </button>
      </div>
    </form>
  );
};
