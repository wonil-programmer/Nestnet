import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./routes/Gallery/Album";
import Home from "./routes/MainHome/Home";
import Gallery from "./routes/Gallery/Gallery";
import GalleryBoardPostForm from "./routes/Gallery/GalleryBoardPostForm";
import { useState } from "react";
import { MainPhotoContext } from "./context/MainPhotoContext";

function App() {
  const [mainImage, setMainImage] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={`gallery`} element={<Gallery />} />
        <Route
          path={"gallery/:postId"}
          element={
            <MainPhotoContext.Provider value={{ mainImage, setMainImage }}>
              <Album />
            </MainPhotoContext.Provider>
          }
        />
        <Route path={"gallery/form"} element={<GalleryBoardPostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
