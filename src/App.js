import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./routes/Gallery/Album";
import Home from "./routes/MainHome/Home";
import Gallery from "./routes/Gallery/Gallery";
import GalleryBoardPostForm from "./routes/Gallery/GalleryBoardPostForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={`gallery`} element={<Gallery />} />
        <Route path={"gallery/:postId"} element={<Album />} />
        <Route path={"gallery/form"} element={<GalleryBoardPostForm />} />
        <Route
          path={"gallery/:postId/edit"}
          element={<GalleryBoardPostForm isModifying={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
