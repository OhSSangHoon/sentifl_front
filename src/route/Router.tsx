import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../pages/home/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Router;
