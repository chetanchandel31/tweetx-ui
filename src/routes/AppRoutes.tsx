import AuthForm from "@/components/AuthForm";
import NotFound from "@/pages/NotFound";
import AuthScreen from "@/providers/AuthProvider/helpers/jsx/AuthScreen";
import AuthorizedRoute from "@/providers/AuthProvider/helpers/jsx/AuthorizedRoute";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { routes } from "./routes";

function EmptyOutletWrapper() {
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate replace to={routes.feed.path} />} />

      <Route
        element={
          <AuthorizedRoute>
            <NavigationLayout />
          </AuthorizedRoute>
        }
      >
        <Route path={routes.feed.path} element={<>feed</>} />
        <Route path={routes.profile.path} element={<>.profile</>} />
        <Route path={routes.users.path} element={<>users</>} />
      </Route>

      <Route
        element={
          // route restriction handled here
          <AuthScreen>
            <EmptyOutletWrapper />
          </AuthScreen>
        }
      >
        <Route element={<AuthForm />} path={routes.auth_login.path} />
        <Route element={<AuthForm />} path={routes.auth_signup.path} />
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
