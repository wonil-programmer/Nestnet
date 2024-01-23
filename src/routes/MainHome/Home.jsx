import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <div className="homeContainer w-min mx-auto">
        <section className="w-min h-max">{/* <MainView /> */}</section>
        <section className="flex bg-fixed bg-no-repeat h-[9rem] bg-[url('./assets/images/bgImage.png')]"></section>
        <section className="flex w-full h-max">
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
