import { useContext } from "react";
//context
import { UserContext } from "../context/UserContext";
// utils
import { createAvatar } from "../utils/createAvatar";
//
import { MuiAvatar } from "./MuiAvatar";
// ----------------------------------------------------------------------

export const MyAvatar = ({ ...other }) => {
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  return (
    <MuiAvatar
      src={user?.photoURL}
      alt={user?.name}
      /*
      // @ts-ignore */
      color={user?.photoURL ? "default" : createAvatar(user?.name).color}
      {...other}
    >
      {createAvatar(user?.name).name}
    </MuiAvatar>
  );
};
