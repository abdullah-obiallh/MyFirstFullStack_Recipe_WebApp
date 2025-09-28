import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextSnack } from "../context/ContextSnack.jsx";
import { ContextToken } from "../context/ContextToken";
export default function AddRecipe() {
  const { handelchangeMessage } = useContext(ContextSnack);
  const { islogin } = useContext(ContextToken);

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
    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);
      formData.append("CoverImage", recipe.CoverImage);

      console.log("Sending.... ,", recipe);
      await axios.post(`/recipe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
      handelchangeMessage("The Recipe Has been Added");
    } catch (error) {
      console.log(error);
    }
  }

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
          required={true}
          onChange={handelformchange}
          name="title"
          className="form-control"
          type="text"
          placeholder="title / recipe name"
        />
        {/* <small style={{ marginBottom: "-16px" }}> like (onion+Tomato)</small> */}
        <textarea
          required={true}
          onChange={handelformchange}
          rows={4}
          name="ingredients"
          className="form-control"
          type="text"
          placeholder="ingredients / onion+Tomato"
        />
        <textarea
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
          Add Recipe
        </button>
      </form>
    </div>
  );
}
