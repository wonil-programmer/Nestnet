import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./routes/Gallery/Album";
import Home from "./routes/MainHome/Home";
import Gallery from "./routes/Gallery/Gallery";

function App() {
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
          element={<Album />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
