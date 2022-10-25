import type { NextPage } from "next";
import { alpha, styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const AboutInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  color: theme.palette.text.disabled,
  textAlign: "center",
}));

const styles = {
  spanContainer: {
    backgroundImage:
      "linear-gradient(to right top,#ecf2fd,#f0effc, #f5ebf7, #fae8f1, #fde6e9, #ffdadb,#ffcfca,#fec4b7,#fdac9b,#fa9381,#f57968,#ef5d51)",
  },
};
const About: NextPage = () => {
  return (
    <AboutInfo>
      <Typography variant="h2">About</Typography>
      <Typography variant="h3" component="span" style={styles.spanContainer}>
        This is Little Bear. He tolerates baths because he knows how phenomenal
        his floof will appear afterwards. 13/10
      </Typography>
    </AboutInfo>
  );
};

export default About;
