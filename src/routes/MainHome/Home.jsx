import Header from "../../components/Header";
import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";

function Home() {
  return (
    <>
      <Header />
      <div class="">
        <main>
          <MainView></MainView>
          <PhotoZone></PhotoZone>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
export default Home;
