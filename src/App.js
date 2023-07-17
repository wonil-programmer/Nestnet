import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import Home from "./routes/Home";
import Gallery from "./routes/Gallery";

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
          element={<Modal />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
