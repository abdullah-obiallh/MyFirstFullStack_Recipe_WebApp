import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { ContextSnack } from "../context/ContextSnack";
export default function SnackBar({ state, message }) {
  const { Color } = useContext(ContextSnack);
  const horizontal = "center";
  const vertical = "top";

  return (
    <Box
      sx={{
        width: 500,
        zIndex: 9999,
      }}
    >
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={state}>
        <Alert
          variant="filled"
          severity={Color === "red" ? "error" : "success"}
          closeText="red"
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
