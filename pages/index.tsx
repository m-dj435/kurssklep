import Main from "../components/Main";
import { ProductDetails } from "../components/Product";

const DATA = {
  title: ``,
  description: `Aliquam eu consectetur eros. Pellentesque rutrum mauris a nibh
          dapibus, congue congue magna laoreet. Mauris at suscipit nisl, eget
          placerat felis. Donec eu tempus risus. Aliquam fringilla condimentum
          efficitur. Sed pretium sapien sed malesuada placerat. Aenean ac
          pharetra sapien.aaaa Pellentesque hendrerit tempus urna ac pellentesque.
          Morbi dapibus aliquet est sed faucibus. Aenean quis nisl nulla. Morbi
          rutrum enim magna, eget accumsan elit pellentesque ullamcorper.`,
  thumbnailUrl: `https://picsum.photos/id/1060/536/354`,
  thumbnailAlt: `Barista z kawą`,
  rating: 4.5,
  id: 1,
};

const Home = () => {
  // console.log({ ...DATA }, DATA);
  return (
    <Main>
      <ProductDetails data={DATA} />
    </Main>
  );
};

export default Home;
