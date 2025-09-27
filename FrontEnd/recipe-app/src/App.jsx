import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { ContextSnack } from "./context/ContextSnack";
import { ContextToken } from "./context/ContextToken";

import SnackBar from "./components/SnackBar";
import MyRecipes from "./components/MyRecipes";
import MyFavRecipes from "./components/MyFavRecipes";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  let tokken = localStorage.getItem("token");

  const [Color, setColor] = useState("");
  const [islogin, setIslogin] = useState(tokken ? true : false);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  function handelchangeMessage(message, color) {
    if (color === "red") {
      setColor("red");
    } else {
      setColor("");
    }
    setOpenSnack(false);
    setOpenSnack(true);
    setMessage(message);
    setTimeout(() => {
      setMessage("");

      setOpenSnack(false);
    }, 2000);
  }
  function handelChangeLogin() {
    if (islogin) {
      setIslogin(false);
    }
  }

  useEffect(() => {
    if (tokken) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, [tokken]);
  // function handelYesOnDeleteDialog() {

  // }
  return (
    <>
      <ContextToken.Provider value={{ handelChangeLogin, islogin }}>
        <ContextSnack.Provider value={{ handelchangeMessage, Color }}>
          <SnackBar state={openSnack} message={message} />
          <BrowserRouter>
            <Navbar />
            <hr />

            <Routes>
              <Route path="/" index element={<HomePage />} />
              <Route path="/MyRecipes" element={<MyRecipes />} />
              <Route path="/MyFavRecipes" element={<MyFavRecipes />} />
              <Route path="/AddRecipe" element={<AddRecipe />} />
              <Route path="/EditRecipe/:id" element={<EditRecipe />} />
            </Routes>
          </BrowserRouter>
        </ContextSnack.Provider>
      </ContextToken.Provider>
      <Footer />
    </>
  );
}

export default App;
