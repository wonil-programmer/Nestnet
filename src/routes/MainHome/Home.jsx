import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <div className="homeContainer scrollbar-hide scroll-smooth h-screen overflow-y-scroll snap-y snap-proximity snap-normal bg-home-background">
        <section className="flex h-screen snap-start">
          <MainView />
        </section>
        <section className="flex justify-center items-center h-screen snap-start">
          <PhotoZone />
        </section>
        <section className="flex justify-center items-center h-screen snap-start">
          <Menus />
        </section>
        <Footer />
      </div>
    </>
  );
}
export default Home;
