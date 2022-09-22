import { useState, useEffect } from "react";
import Link, { LinkProps } from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  href: string;
}

function TabPanel(props: TabPanelProps) {
  const { href, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InstructorNav = () => {
  const [current, setCurrent] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //   useEffect(() => {
  //     typeof navigator !== "undefined" && setValue(window.location.pathname);
  //   }, [typeof navigator !== "undefined" && window.location.pathname]);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="instructor-panel"
          centered
        >
          <Tab label="Dashboard" {...a11yProps(0)} href="/instructor" />
          <Tab
            label="Yeni Kurs"
            {...a11yProps(1)}
            href="/instructor/course/create"
          />
          <Tab label="Ödemeler" {...a11yProps(2)} href="/instructor/revenue" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default InstructorNav;
