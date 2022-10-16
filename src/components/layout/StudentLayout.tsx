import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";
import { LessonNav } from "../accordion/lessonNav";

export const StudentRouterWrapper = ({ children, showNav = true, data }: any) => {
  const classes = useRotateIconStyles();
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
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
        <div>
          
          <div className="container-fluid">{children}</div>
        </div>
      )}
    </>
  );
};
