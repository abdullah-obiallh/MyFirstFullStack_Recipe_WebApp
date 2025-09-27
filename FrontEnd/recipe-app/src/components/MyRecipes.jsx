import axios from "axios";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { ContextSnack } from "../context/ContextSnack";
//MU Material for delete
//material ui for delete
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function MyRecipes() {
  const [ShowDialog, SetShowDialog] = useState(false);
  const { handelchangeMessage } = useContext(ContextSnack);
  const [RecipeForDelete, SetRecipeForDelete] = useState({});
  const [MyRecipes, SetMyRecipes] = useState([]);
  function handelclosedDeleteialog() {
    SetShowDialog(false);
  }
  function handelOpenDeleteialog() {
    SetShowDialog(true);
  }

  function ClickToDelete() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id !== RecipeForDelete.CreatedBy) {
      console.log(`User ID ${user._id} Recipe ID ${RecipeForDelete.CreatedBy}`);
      handelchangeMessage(
        "You can't delete recipe that not belong to you!!",
        "red"
      );
      handelclosedDeleteialog();
      SetRecipeForDelete(null);
      return;
    }
    axios
      .delete(`http://localhost:5000/recipe/${RecipeForDelete._id}`)
      .then(() => {
        handelchangeMessage("Deleted Success");
        SetMyRecipes((prev) =>
          prev.filter((r) => r._id !== RecipeForDelete._id)
        );
        handelclosedDeleteialog();
        SetRecipeForDelete(null);
      })
      .catch((err) => {
        handelchangeMessage(`Something Went Wrong! ${err}`, "red");
        handelclosedDeleteialog();
        SetRecipeForDelete(null);
      });
  }
  useEffect(() => {
    const fetcMyRecipe = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return;
      }
      const { data } = await axios.get("http://localhost:5000/Recipe");
      const myRecipes = data.filter((recipe) => {
        return recipe.CreatedBy === user._id;
      });
      SetMyRecipes(myRecipes);
    };
    fetcMyRecipe();
  }, []);

  return (
    <div className="cards-wrapper" style={{ marginLeft: "20px" }}>
      <Dialog
        open={ShowDialog}
        onClose={handelclosedDeleteialog}
        disableRestoreFocus
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="red" id="alert-dialog-title">
          {"are you sure you want to delete it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete it, you won't be able to get it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelclosedDeleteialog} autoFocus>
            NO
          </Button>
          <Button onClick={ClickToDelete}>YES</Button>
        </DialogActions>
      </Dialog>
      {MyRecipes[0] == null ? (
        <span style={{ width: "100%", textAlign: "center" }}>
          "No recipe Found"
        </span>
      ) : (
        MyRecipes.map((item) => {
          return (
            <div className="recipe-card" key={item._id}>
              <img
                style={{ width: "100%" }}
                src={`http://localhost:5000/public/images/${item.CoverImage}`}
                alt="Recipe Image"
              />
              <h4 style={{ textAlign: "center" }}>{item?.title}</h4>
              <p style={{ fontWeight: "bold" }}>{item?.ingredients} </p>
              <p style={{ marginBottom: "12px" }}>{item?.instructions}</p>

              {/* <FaHeart className="icons" /> */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "#ff9560",
                }}
              >
                <MdDeleteOutline
                  onClick={() => {
                    handelOpenDeleteialog();
                    SetRecipeForDelete(item);
                  }}
                  className="Delete-icon"
                />
                <span style={{ marginLeft: "10px" }}>
                  <a href={`/EditRecipe/${item._id}`}>
                    <MdOutlineModeEdit className="Edit-icon" />
                  </a>
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyRecipes;
