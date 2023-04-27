import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import "./Home.scss";
import axiosClient from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {

  const categories = useSelector(store => store.categorySlice.categories);
  const [topProductList, setTopProductList] = useState(null)

  async function fetchData() {
    const topProductResponse = await axiosClient.get("/products?filters[isTopPick][$eq]=true&populate=image");

    setTopProductList(topProductResponse.data.data);

    console.log(topProductResponse.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <div className="container">
        
        <section className="collections">
          <div className="info">
            <h2 className="heading">Pick by category</h2>
            <p className="subheading">shop from our best film posters</p>
          </div>
          <div className="content">
            {categories?.map(category => <Category key={category.id} category={category.attributes} />)}
          </div>
        </section>

        <section className="collections">
          <div className="info">
            <h2 className="heading">Our top picks</h2>
            <p className="subheading">Here are our top selling posters</p>
          </div>
          <div className="content">
            {topProductList?.map(topProduct => <Product key={topProduct.id} product={topProduct}/>)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
