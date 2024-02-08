export const routes = {
  feed: {
    path: "/feed",
    name: "Feed",
    showInTopNav: true,
  },
  users: {
    path: "/users",
    name: "Users",
    showInTopNav: true,
  },
  profile: {
    path: "/profile",
    name: "Profile",
    showInTopNav: true,
  },
  auth_login: {
    path: "/auth/login",
    name: "Login",
    showInTopNav: false,
  },
  auth_signup: {
    path: "/auth/signup",
    name: "Sign Up",
    showInTopNav: false,
  },
} as const;
