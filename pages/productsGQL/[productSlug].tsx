import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProductDetails } from "../../components/ProductGQL";
import { serialize } from "next-mdx-remote/serialize";
import { apolloClient } from "../../graphql/apolloClient";
import { gql } from "@apollo/client";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductSlugsDocument,
  GetProductSlugsQuery,
} from "../../genetated/graphql";

const ProductSlugPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href="/productsGQL">
        <a className="text-blue-700 text-xl p-4 font-semibold">
          Wróć na stronę główną
        </a>
      </Link>
      <ProductDetails
        data={{
          id: data.slug,
          title: data.name,
          thumbnailUrl: data.images[0].url,
          thumbnailAlt: data.name,
          description: data.description,
          rating: 4,
          longDescription: data.longDescription,
        }}
      />
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductSlugsQuery>({
    query: GetProductSlugsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productSlug: product.slug,
        },
      };
    }),
    fallback: false,
  };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productSlug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    variables: {
      slug: params.productSlug,
    },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  const longDescription = data.product.description;
  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(longDescription),
      },
    },
  };
};

export default ProductSlugPage;
