import { gql, useQuery } from "@apollo/client";
import Main from "../components/Main";

const Home = () => {
  const { loading, error, data } = useQuery(gql`
    query GetProductList {
      products {
        id
        name
        price
        slug
      }
    }
  `);
  if (loading) {
    return <Main>Ładowanie...</Main>;
  }
  if (error) {
    return <Main>{JSON.stringify(error)}</Main>;
  }
  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  );
};

export default Home;
