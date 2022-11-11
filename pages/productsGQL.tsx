import { gql } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { InferGetStaticPropsType } from "next";
import ProductListItem from "../components/ProductGQL";
import {
  GetProductListDocument,
  GetProductListQuery,
} from "../genetated/graphql";

const ProductsPageGQL = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map((product) => {
        return (
          <li key={product.slug} className="shadow-xl border-2">
            <ProductListItem
              data={{
                id: product.slug,
                title: product.name,
                thumbnailUrl: product.images[0].url,
                thumbnailAlt: product.name,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsPageGQL;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument,
  });

  return {
    props: {
      data,
    },
  };
};
