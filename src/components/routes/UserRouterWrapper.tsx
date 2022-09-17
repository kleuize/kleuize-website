import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../styles/RotetesIcon";
import UserNav from "../nav/UserNav";
import Box from "@mui/material/Box";

export const UserRouterWrapper = ({ children }: any) => {
  const classes = useRotateIconStyles();
  // state
  const [ok, setOk] = useState<boolean>(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined className={classes.rotateIcon} />
      ) : (
        <Box>
          <Box>
            <UserNav />
          </Box>
          <Box>{children}</Box>
        </Box>
      )}
    </>
  );
};
