import { InferGetStaticPropsType } from "next";
import React, { useState, useEffect } from "react";
import PaginationComponent from "../components/PaginationComponent";
import ProductListItem, { Rating } from "../components/Product";
import { useQuery } from "react-query";

const PAGE_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const OFFSET = 25;

export const getStaticProps = async ({ queryKey }: any) => {
  const [_, pageNr] = queryKey;
  const pagesToOmit = ((Number(pageNr) - 1) * OFFSET).toString();
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${OFFSET}&offset=${pagesToOmit}`
  );
  const data: StoreApiResponse[] = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Pagination = ({
  setter,
  activePage,
}: {
  setter: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
}) => {
  console.log(setter);
  return (
    <div className="flex justify-center gap-3">
      {PAGE_NUMBER.map((item) => {
        return (
          <button
            key={item}
            className={`border-2 p-5 ${
              activePage === item.toString() && "bg-red-600"
            }`}
            onClick={() => {
              return setter(item.toString());
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

{
  /* {product.title + " " + product.price + "zł"} */
}
const ProductsPage = () => {
  const [pageNr, setPageNr] = useState("1");
  const { data, isLoading, error } = useQuery(
    ["products", pageNr],
    getStaticProps
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }
  return (
    <>
      <ul className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {data.map((product) => {
          return (
            <li key={product.id} className="shadow-xl border-2">
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                }}
              />
            </li>
          );
        })}
      </ul>
      {/* <PaginationComponent /> */}
      <Pagination setter={setPageNr} activePage={pageNr} />
    </>
  );
};

export default ProductsPage;
