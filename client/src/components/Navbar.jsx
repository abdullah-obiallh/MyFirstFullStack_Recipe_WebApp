import img_3 from "../assets/img3.png";
import { useContext, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { ContextSnack } from "../context/ContextSnack";
import { ContextToken } from "../context/ContextToken";

export default function Navbar() {
  const { handelchangeMessage } = useContext(ContextSnack);
  const [open, setOpen] = useState(false);
  const { handelChangeLogin, islogin } = useContext(ContextToken);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handelchangeMessage("Log Out Success");
    handelChangeLogin();
  };

  function handelProtectedRoute(e) {
    if (!islogin) {
      e.preventDefault();
      handleOpen();
    }
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-xl ">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={img_3} alt="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    style={{ fontSize: "20px" }}
                    className="nav-link "
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a
                    style={{ fontSize: "20px" }}
                    className="nav-link"
                    onClick={handelProtectedRoute}
                    href={islogin ? "/MyFavRecipes" : "/"}
                  >
                    My Favourites
                  </a>
                </li> */}

                <li className="nav-item">
                  <a
                    style={{ fontSize: "20px" }}
                    className="nav-link"
                    onClick={handelProtectedRoute}
                    href={islogin ? "/MyRecipes" : "/"}
                  >
                    MyRecipes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    style={{ fontSize: "20px" }}
                    className="nav-link  "
                    href="#"
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    style={{ fontSize: "18px", marginRight: "15px" }}
                    className="login-btn"
                    onClick={islogin ? handleLogout : handleOpen}
                  >
                    {islogin ? "log out" : "Register/log in"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {open ? (
        <Modal handleClose={handleClose}>
          <InputForm handleClose={handleClose} />
        </Modal>
      ) : null}
    </>
  );
}
