import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";

function Home() {
  return (
    <>
      <div className="homeContainer min-w-fit px-20 bg-white">
        <section className="w-full h-max mx-auto">
          <MainView />
        </section>
        {/* 로고 고정 배경 이미지 */}
        <section className="flex bg-fixed bg-bottom bg-no-repeat h-[9rem] bg-[url('./assets/images/bgImage.png')]"></section>
        <section className="flex w-full h-max">
          <PhotoZone />
        </section>
        <section className="flex w-full h-max">
          <Menus />
        </section>
      </div>
      <Footer />
    </>
  );
}
export default Home;
