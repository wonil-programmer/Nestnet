import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./routes/Gallery/Album/Album";
import Home from "./routes/MainHome/Home";
import Gallery from "./routes/Gallery/Gallery";
import GalleryBoardPostForm from "./routes/Gallery/GalleryBoardPostForm";
import AdminHome from "./routes/Admin/AdminHome";
import MembersMainView from "./routes/Admin/Members/MembersMainView";
import { HeadNavbar } from "./components/HeadNavbar";
import AdminNavBar from "./routes/Admin/AdminNavbar";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={"/"} element={<HeadNavbar />}>
            <Route path={"/"} element={<Home />} />
            <Route path={`gallery`} element={<Gallery />} />
            <Route path={"gallery/:postId"} element={<Album />} />
            <Route path={"gallery/form"} element={<GalleryBoardPostForm />} />
            <Route
              path={"gallery/:postId/edit"}
              element={<GalleryBoardPostForm isModifying={true} />}
            />
          </Route>
          <Route path={"admin/"} element={<AdminNavBar />}>
            <Route path={"home"} element={<AdminHome />} />
            <Route path={"users"} element={<MembersMainView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
