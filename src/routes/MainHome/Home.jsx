import Header from "../../components/Header";
import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <Header />
      <div class="">
        <main>
          <MainView></MainView>
          <PhotoZone></PhotoZone>
          <Menus></Menus>
          <Footer></Footer>
        </main>
      </div>
    </>
  );
}
export default Home;
