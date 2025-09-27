import axios from "axios";
import { useContext } from "react";
import { ContextSnack } from "../context/ContextSnack.jsx";
import { useState } from "react";
function InputForm({ handleClose }) {
  const { handelchangeMessage } = useContext(ContextSnack);
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setErorr] = useState("");
  const handlechangesignin = () => {
    setIsSignIn(!isSignIn);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handelsumit = async (e) => {
    e.preventDefault();
    setErorr("");
    let endpoint = isSignIn ? "login" : "register";

    try {
      const res = await axios.post(
        `http://localhost:5000/user/${endpoint}`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      handelchangeMessage(res.data.message);
      handleClose();
    } catch (err) {
      console.log(err.response.data.message);

      setErorr(err.response.data.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handelsumit}
        className="input-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          style={{ marginTop: "20px", height: "45px" }}
          name="email"
          className="form-control"
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          style={{ marginTop: "10px", height: "45px" }}
          name="password"
          className="form-control"
          type="password"
          placeholder="Enter Your Password"
        />
        <span>
          <button
            className="button"
            style={{
              backgroundColor: "#cacacaff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 8px",
              fontSize: "20px",
              marginTop: "10px",
            }}
            type="submit"
          >
            {isSignIn ? "Login" : "Sign Up"}
          </button>
          {error !== "" && (
            <span style={{ color: "red", marginLeft: "10px" }}>{error}</span>
          )}
        </span>

        <p onClick={handlechangesignin}>
          {isSignIn ? "Don't have an account?" : "You have an account?"}
        </p>
      </form>
    </>
  );
}

export default InputForm;
