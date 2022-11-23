import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Pagination } from "../../../components/Pagination";
import ProductListItem from "../../../components/Product";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <ul className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((product) => {
          return (
            <li key={product.id} className="shadow-xl border-2">
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.title,
                  thumbnailUrl: product.image,
                  thumbnailAlt: product.title,
                }}
              />
            </li>
          );
        })}
      </ul>
      <Pagination pages={10} />
    </>
  );
};

export default ProductsPage;

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getStaticPaths = async () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return {
    paths: data.map((i) => {
      return {
        params: {
          page: i.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  const offset = params;
  const productsOnPage = 25;
  const offsetAtPage = Number(params?.page) * productsOnPage - productsOnPage;

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${productsOnPage}&offset=${offsetAtPage}`
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};
