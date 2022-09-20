import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {hidden && (
        <Container>
          <Box sx={{ backgroundColor: "red" }}>
            {JSON.stringify(user, null, 4)}
          </Box>
        </Container>
      )}
    </>
  );
};

export default UserIndex;
