import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { UserRouterWrapper } from "../../components/routes/UserRouterWrapper";
import { SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const UserIndex = () => {
  const classes = useRotateIconStyles();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const JumbotronStyle = styled("div")(({theme}) => ({
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "grey",
    borderRadius: 5,
    width: "100%",
    height: 60,
    margin: 20
  }))

  return (
    <Container>
      <UserRouterWrapper>
        {loading && <SyncOutlined className={classes.rotateIcon} />}
        <JumbotronStyle>
          <Typography> Öğrenci Paneli</Typography>
        </JumbotronStyle>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {JSON.stringify(user, null, 4)}
        </Box>
      </UserRouterWrapper>
    </Container>
  );
};

export default UserIndex;
