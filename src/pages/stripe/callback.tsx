import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useRotateIconStyles } from "../../styles/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";

const StripeCallback = () => {
  const classes = useRotateIconStyles();
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        // console.log(res);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return <SyncOutlined className={classes.rotateIcon} />;
};

export default StripeCallback;
