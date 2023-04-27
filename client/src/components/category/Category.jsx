import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Category.scss";

function Category({category}) {
  const navigate = useNavigate();
  return (
    <div className="Category" onClick={() => navigate(`/category/${category.key}`)} style={{backgroundImage: `url(${category.image.data.attributes.url})`}}>
      <div className="category-content center">
        {category?.title}
      </div>
    </div>
  )
}

export default Category