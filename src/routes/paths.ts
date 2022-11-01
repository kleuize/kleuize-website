export const path = (root: any, sublink: any): string => {
  return `${root}${sublink}`;
};

const ROOTS = "/";
const ROOTS_AUTH = "/";
const ROOTS_USER = "/user";
const ROOTS_INSTRUCTOR = "/instructor";

export const PATH_DASHBOARD = {
  root: ROOTS,
  auth: {
    login: path(ROOTS_AUTH, "/login"),
    register: path(ROOTS_AUTH, "/register"),
    logout: path(ROOTS_AUTH, "/logout"),
  },
  user: {
    root: path(ROOTS_USER, "/"),
    course: path(ROOTS_USER, "/course"),
    profile: path(ROOTS_USER, "/user/profile"),
    account: path(ROOTS_USER, "/user/account"),
    setting: path(ROOTS_USER, "/user/setting"),
    becomeInstructor: path(ROOTS_USER, "/become-instructor"),
  },
  instructor: {
    root: path(ROOTS_INSTRUCTOR, "/"),
    list: path(ROOTS_INSTRUCTOR, "list"),
    create: path(ROOTS_INSTRUCTOR, "/course/create"),
    revenue: path(ROOTS_INSTRUCTOR, "/revenue"),
    profile: path(ROOTS_INSTRUCTOR, "/profile"),
    account: path(ROOTS_INSTRUCTOR, "/account"),
    setting: path(ROOTS_INSTRUCTOR, "/setting"),
  },
};
