import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductHomeFirst, { Rating } from "../components/ProductHomeFirst";

const PAGE_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const OFFSET = 25;

interface HomeFirstCSR {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

const getProductsHomeFirstCSR = async ({ queryKey }: any) => {
  const [_, pageNr] = queryKey;
  const pagesToOmit = ((Number(pageNr) - 1) * OFFSET).toString();
  console.log(pagesToOmit);
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${OFFSET}&offset=${pagesToOmit}`
  );
  const data: HomeFirstCSR[] = await res.json();
  return data;
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

const ProductsCsrPage = () => {
  const [pageNr, setPageNr] = useState("1");
  const { data, isLoading, error } = useQuery(
    ["products", pageNr],
    getProductsHomeFirstCSR
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <>
      <ul className="flex justify-between flex-wrap">
        {data.map((product) => {
          return (
            <li key={product.id} className="shadow-xl border-2 w-1/4 mb-10">
              <ProductHomeFirst
                data={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  category: product.category,
                  rating: product.rating,
                  image: product.image,
                  longDescription: product.longDescription,
                }}
              />
            </li>
          );
        })}
      </ul>

      <Pagination setter={setPageNr} activePage={pageNr} />
    </>
  );
};

export default ProductsCsrPage;
