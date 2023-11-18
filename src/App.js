import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./routes/Gallery/Album";
import Home from "./routes/MainHome/Home";
import Gallery from "./routes/Gallery/Gallery";
import GalleryBoardPostForm from "./routes/Gallery/GalleryBoardPostForm";
import { CommentContext } from "./context/CommentContext";
import { useState } from "react";

function App() {
  const [comments, setComments] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={`gallery`} element={<Gallery />} />
        <CommentContext.Provider value={{ comments, setComments }}>
          <Route path={"gallery/:postId"} element={<Album />} />
        </CommentContext.Provider>
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
