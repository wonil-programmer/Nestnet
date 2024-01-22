import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <div className="homeContainer w-max">
        <section className="flex w-max h-max">
          <MainView />
        </section>
        <section className="flex w-max h-max">
          <PhotoZone />
        </section>
        <section className="flex w-max h-max">
          <Menus />
        </section>
        <Footer />
      </div>
    </>
  );
}
export default Home;
