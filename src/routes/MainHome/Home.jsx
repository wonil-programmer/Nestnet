import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <div className="homeContainer">
        <section className="flex h-screen">
          <MainView />
        </section>
        <section className="flex h-screen">
          <PhotoZone />
        </section>
        <section className="flex h-screen">
          <Menus />
        </section>
        <Footer />
      </div>
    </>
  );
}
export default Home;
