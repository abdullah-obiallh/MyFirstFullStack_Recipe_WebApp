import img_13 from "../assets/img13.png";

import "../App.css";
import AllRecipes from "../components/AllRecipes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ContextSnack } from "../context/ContextSnack";
import { useContext } from "react";
import { ContextToken } from "../context/ContextToken";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

function HomePage() {
  const { handelchangeMessage } = useContext(ContextSnack);
  const { islogin } = useContext(ContextToken);
  const [isOpen, setisOpen] = useState(false);

  const handleClose = () => setisOpen(false);
  const navigate = useNavigate();
  const addRecipe = () => {
    if (!islogin) {
      handelchangeMessage("You Must Login / Register ", "red");
      setisOpen(true);
    } else {
      navigate("AddRecipe");
    }
  };
  return (
    <>
      {isOpen ? (
        <div>
          <Modal handleClose={handleClose}>
            <InputForm handleClose={handleClose} />
          </Modal>
        </div>
      ) : null}
      <section className="Home">
        <div className="Left">
          <h1>share Your recipe with the world!</h1>
          <p>Come and share your recipes with us</p>
          <button onClick={addRecipe}>Add Your Recipe</button>
        </div>
        <div className="right">
          <img src={img_13} alt="recipe" width="350px" height="350px" />
        </div>
      </section>
      <div style={{ marginBottom: "-7px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff9560"
            fillOpacity="1"
            d="M0,128L26.7,144C53.3,160,107,192,160,181.3C213.3,171,267,117,320,106.7C373.3,96,427,128,480,122.7C533.3,117,587,75,640,69.3C693.3,64,747,96,800,90.7C853.3,85,907,43,960,42.7C1013.3,43,1067,85,1120,122.7C1173.3,160,1227,192,1280,176C1333.3,160,1387,96,1413,64L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
        <AllRecipes />
      </div>
    </>
  );
}

export default HomePage;
