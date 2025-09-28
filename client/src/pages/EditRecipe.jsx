import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ContextSnack } from "../context/ContextSnack.jsx";
import { ContextToken } from "../context/ContextToken";
export default function EditRecipe() {
  const { id } = useParams();
  const { handelchangeMessage } = useContext(ContextSnack);
  const { islogin } = useContext(ContextToken);
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [recipe, setrecipe] = useState({});
  function handelformchange(e) {
    console.log(e.target.files?.[0]);
    let val;
    let name_val = e.target.name;
    if (name_val === "ingredients") {
      val = e.target.value.split(/[\s,+]+/);
    } else if (name_val === "CoverImage") {
      val = e.target.files?.[0];
    } else {
      val = e.target.value;
    }
    setrecipe({ ...recipe, [e.target.name]: val });
  }
  async function handelsumbit(e) {
    e.preventDefault();

    if (!islogin) {
      handelchangeMessage("You Must Be Login ", "red");
      return null;
    }
    if (user._id !== recipe.CreatedBy) {
      handelchangeMessage("This is Not Your Recipe !!? ", "red");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);
      formData.append("CoverImage", recipe.CoverImage);

      console.log("Edditing.... ,", recipe);
      await axios.put(`/recipe/${recipe._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
      handelchangeMessage("The Recipe Has been Edited");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get(`/recipe/${id}`).then((response) => {
      let data = response.data;
      setrecipe({
        _id: data._id,
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        CoverImage: data.CoverImage ? data.CoverImage : null,
        CreatedBy: data.CreatedBy,
        createdAt: data.createdAt,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        padding: "20px 0px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handelsumbit}
        className="input-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "600px",
        }}
      >
        <label
          style={{
            margin: "auto",
            color: "#ff9560",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          Recipe Form
        </label>
        <input
          value={recipe.title ? recipe.title : ""}
          required={true}
          onChange={handelformchange}
          name="title"
          className="form-control"
          type="text"
          placeholder="title / recipe name"
        />
        {/* <small style={{ marginBottom: "-16px" }}> like (onion+Tomato)</small> */}
        <textarea
          value={
            Array.isArray(recipe.ingredients)
              ? recipe.ingredients.join(", ")
              : recipe.ingredients
          }
          required={true}
          onChange={handelformchange}
          rows={4}
          name="ingredients"
          className="form-control"
          type="text"
          placeholder="ingredients / onion+Tomato"
        />
        <textarea
          value={recipe.instructions ? recipe.instructions : ""}
          required={true}
          onChange={handelformchange}
          rows={4}
          name="instructions"
          className="form-control"
          type="text"
          placeholder="instructions / how to do it"
        />
        <label style={{ color: "#ff9560", fontWeight: "bold" }}>
          Add Image
        </label>
        <input
          onChange={handelformchange}
          name="CoverImage"
          className="form-control"
          type="file"
          placeholder="title"
        />
        <button
          className="addrecipe-btn"
          style={{
            background: "#ff9560",
            border: "none",
            borderRadius: "5px",
            height: "50px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Edit Recipe
        </button>
      </form>
    </div>
  );
}
