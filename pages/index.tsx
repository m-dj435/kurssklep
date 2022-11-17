import Main from "../components/Main";
import {
  CreateProductReviewDocument,
  useCreateProductReviewMutation,
} from "../genetated/graphql";

const Home = () => {
  const [createReview, { loading, error, data }] =
    useCreateProductReviewMutation();
  const addReview = () => {
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "KLIENT",
          name: "Magdalena",
          email: "siema@example.pl",
          content: "Świetny produkt",
          rating: 5,
        },
      },
    });
  };

  return (
    <Main>
      <button
        onClick={addReview}
        type="button"
        className="group relative inline-block focus:outline-none focus:ring"
      >
        <span className="relative inset-0 translate-x-1.5 translate-y-1.5 bg-violet-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 inline-block border-2 border-current  text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
          Dodaj komentarz
        </span>
      </button>
      {loading && <div>Ładowanie...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Main>
  );
};

export default Home;
// const { loading, error, data } = useQuery(gql`
//   query GetProductList {
//     products {
//       id
//       name
//       price
//       slug
//     }
//   }
// `);

// if (loading) {
//   return <Main>Ładowanie...</Main>;
// }
// if (error) {
//   return <Main>{JSON.stringify(error)}</Main>;
// }
