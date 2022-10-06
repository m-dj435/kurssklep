import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Product from "../components/Product";

const DATA = {
  description: `Aliquam eu consectetur eros. Pellentesque rutrum mauris a nibh
          dapibus, congue congue magna laoreet. Mauris at suscipit nisl, eget
          placerat felis. Donec eu tempus risus. Aliquam fringilla condimentum
          efficitur. Sed pretium sapien sed malesuada placerat. Aenean ac
          pharetra sapien. Pellentesque hendrerit tempus urna ac pellentesque.
          Morbi dapibus aliquet est sed faucibus. Aenean quis nisl nulla. Morbi
          rutrum enim magna, eget accumsan elit pellentesque ullamcorper.`,
  thumbnailUrl: `https://picsum.photos/id/1060/536/354`,
  thumbnailAlt: `Barista z kawą`,
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
