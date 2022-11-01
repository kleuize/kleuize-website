import { useEffect, useState, Suspense } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
//@mui
import Box from "@mui/material/Box";
//components
import UserNav from "../nav/UserNav";
import { LoadingSpinner } from "../LoadingSpinner";

type LayoutProps = {
  children?: React.ReactNode;
};

export const UserLayout = ({ children }: LayoutProps) => {
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
        <LoadingSpinner />
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
