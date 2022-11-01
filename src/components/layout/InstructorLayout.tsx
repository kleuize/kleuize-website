import { useState, useEffect, Suspense } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
//@mui
import Box from "@mui/material/Box";
//components
import InstructorNav from "../nav/InstructorNav";
import { LoadingSpinner } from "../LoadingSpinner";

type InstructorLayout = {
  children: React.ReactNode;
};
const InstructorLayout = ({ children }: InstructorLayout) => {
  const [ok, setOk] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      if (data.ok) setOk(true);
    } catch (err) {
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <LoadingSpinner />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <InstructorNav />
          </Box>
          <Suspense>{children}</Suspense>
        </Box>
      )}
    </>
  );
};

export default InstructorLayout;
