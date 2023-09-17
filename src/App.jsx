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
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL}/gallery`}
          element={<Gallery />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/gallery/:id`}
          element={
            <MainPhotoContext.Provider value={{ mainImage, setMainImage }}>
              <Album />
            </MainPhotoContext.Provider>
          }
        />
        <Route
          path={`${process.env.PUBLIC_URL}/gallery/form`}
          element={<GalleryBoardPostForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
