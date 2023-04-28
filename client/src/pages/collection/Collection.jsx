import React, { useState } from "react";
import "./Collection.scss";
import Product from "../../components/product/Product";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Categories() {
  const params = useParams();
  const navigate = useNavigate();
  const categories = useSelector((store) => store.categorySlice.categories);
  console.log("collections page categories: ", categories);
  const [products, setProducts] = useState([]);

  const sortOptions = [
    {
      value: "Price - Low to High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProducts() {
    const url = !params.categoryId
      ? `/products?populate=*&sort[0]=${sortBy}&sort[1]=title`
      : `/products?populate=*&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}&sort[1]=title`;
    const productsResponse = await axiosClient.get(url);
    if(sortBy === "createdAt"){
      productsResponse.data.data.reverse();
    }
    setProducts(productsResponse.data.data);
    console.log("productResponse categories: ", productsResponse);
  }

  useEffect(() => {
    fetchProducts();
  }, [params.categoryId, sortBy]);

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Posterz is changing vibe and look of your space.</h2>
            <p>
              Below we have listed some category of products available with us. Poster include both textual and/or graphic elements. These are both eye-catching and informative. Posterz is wishing you a happy Shopping.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-text">
              <h3>Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((sortOption) => (
                  <option key={sortOption.sort} value={sortOption.sort}>
                    {sortOption.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <h3>Filter By Category</h3>
            {categories.map((category) => {
              console.log(category.id, " ", params.categoryId);
              return (
                <div key={category.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    id={category.attributes.key}
                    checked={category.attributes.key === params.categoryId}
                    onChange={(e) => navigate(`/category/${e.target.id}`)}
                  />
                  <label htmlFor={category.attributes.key}>
                    {category?.attributes?.title}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="products-box">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
