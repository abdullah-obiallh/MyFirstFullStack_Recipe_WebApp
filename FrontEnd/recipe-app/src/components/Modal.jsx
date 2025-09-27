import "bootstrap/dist/css/bootstrap.min.css";
import Grow from "@mui/material/Grow";

export default function Modal({ handleClose, children }) {
  function OnClick() {
    handleClose();
  }
  function stopClickInside(e) {
    e.stopPropagation();
  }
  return (
    <div
      onClick={OnClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,

        width: "100%",
        height: "100% ",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <Grow
        in={true}
        style={{
          display: "block",
        }}
      >
        <div
          className="Modal-Content"
          onClick={stopClickInside}
          style={{
            display: "flex",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "50px 30px",
            paddingBottom: "80px",
            marginTop: "150px",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login / Register</h5>
                <button
                  onClick={OnClick}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div
                style={{ width: "500px", height: "200px" }}
                className="Body-content"
              >
                {children}{" "}
              </div>
            </div>
          </div>
        </div>
      </Grow>
    </div>
  );
}
