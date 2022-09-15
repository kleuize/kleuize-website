import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Box } from "@mui/material";
import { UserRouterWrapper } from "../../components/routes/UserRouterWrapper";

const UserIndex = () => {

  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <UserRouterWrapper>
          <Box sx={{ backgroundColor: "red" }}>
            {JSON.stringify(user, null, 4)}
          </Box>
    </UserRouterWrapper>
  );
};

export default UserIndex;
