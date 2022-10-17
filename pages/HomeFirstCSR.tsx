import React from "react";
import { useQuery } from "react-query";
import ProductHomeFirst, { Rating } from "../components/ProductHomeFirst";

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

const getProductsHomeFirstCSR = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: HomeFirstCSR[] = await res.json();
  return data;
};

const ProductsCsrPage = () => {
  const { data, isLoading, error } = useQuery(
    "products",
    getProductsHomeFirstCSR
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <ul>
      {data.map((product) => {
        return (
          <li key={product.id} className="shadow-xl border-2">
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
  );
};

export default ProductsCsrPage;
