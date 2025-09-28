import axios from "axios";

import { useEffect, useState } from "react";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/Recipe")
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
                src={`/public/images/${item.CoverImage}`}
                alt="Recipe Image"
              />
              <h4 style={{ textAlign: "center" }}>{item?.title}</h4>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                }}
              >
                {item.ingredients[0].split(",").join(",\u200B ")}
              </p>
              <small>{item?.instructions}</small>
              <div className="icons"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
