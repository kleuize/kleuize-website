import { useEffect, useState, Suspense } from "react";
//3rd
import axios from "axios";
//router
import { useRouter } from "next/router";
//@mui
import { Stack, Box } from "@mui/material";
//component
import UserNav from "../nav/UserNav";
//icons
import { SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";

type LayoutProps = {
  children?: React.ReactNode;
};

export const UserLayout = ({ children }: LayoutProps) => {
  const classes = useRotateIconStyles();
  const [ok, setOk] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <SyncOutlined className={classes.rotateIcon} />
        </Stack>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <UserNav />
          </Box>
          <Suspense>{children}</Suspense>
        </Box>
      )}
    </>
  );
};
