import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Categories from "./pages/collection/Collection";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import { fetchCategories } from "./redux/slice/categorySlice";
import {useDispatch} from "react-redux";
import Payments from "./components/payments/Payments";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId?" element={<Categories />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/payments/:status" element={<Payments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
