import axios from "axios";

import { useEffect, useState } from "react";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Recipe")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipes!", error);
      });
  }, []);

  return (
    <div className="recipes-container">
      <h2 style={{ textAlign: "center" }}>All Recipes</h2>
      <div className="cards-wrapper">
        {recipes?.map((item) => {
          return (
            <div className="recipe-card" key={item._id}>
              <img
                style={{ width: "100%", maxHeight: "300px" }}
                src={`http://localhost:5000/public/images/${item.CoverImage}`}
                alt="Recipe Image"
              />
              <h4 style={{ textAlign: "center" }}>{item?.title}</h4>
              <p style={{ fontWeight: "bold" }}>{item?.ingredients} </p>
              <small>{item?.instructions}</small>
              <div className="icons"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
