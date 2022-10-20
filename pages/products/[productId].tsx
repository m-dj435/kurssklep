import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProductDetails, Rating } from "../../components/Product";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href="/ProductsPage">
        <a className="text-blue-700 text-xl  font-semibold">
          Wróć na stronę główną
        </a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          image: data.image,
          price: data.price,
          description: data.description,
          category: data.category,
          rating,
          longDescription: data.description,
        }}
      />
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
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
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();
  return {
    props: {
      data,
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  longDescription: string;
}

export default ProductIdPage;
