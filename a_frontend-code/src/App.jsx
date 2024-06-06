import "./App.css";
import Navbar from "./component/navbar/Navbar";
import MyRoutes from "./routes/MyRoutes";
import { ToastContext } from "./context/ToastContext";
import { useState } from "react";
import Snackbar from "@mui/joy/Snackbar";

function App() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("warning");
  const [msg, setMsg] = useState("");

  const showSnack = (color, msg) => {
    setMsg(msg);
    setColor(color);
    setOpen(true);
  };

  return (
    <div>
      <ToastContext.Provider value={{ showSnack }}>
        <Navbar />
        <MyRoutes />

        <Snackbar
          autoHideDuration={3500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          variant="outlined"
          color={color}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpen(false);
          }}
        >
          {msg}
        </Snackbar>
      </ToastContext.Provider>
    </div>
  );
}

export default App;
