export const path = (root: any, sublink: any): string => {
  return `${root}${sublink}`;
};

const ROOTS_USER = "/user";
const ROOTS_DASHBOARD = "/instructor";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_USER, "/"),
    list: path(ROOTS_USER, "/user/list"),
    course: path(ROOTS_USER, "/user/course"),
    profile: path(ROOTS_USER, "/user/profile"),
    account: path(ROOTS_USER, "/user/account"),
  },
};
