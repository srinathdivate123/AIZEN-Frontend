import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import WorkspaceDashboard from "@/page/workspace/Dashboard";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import ViewImagesPage from "@/page/workspace/ViewImages";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.VIEW_IMAGES, element: <ViewImagesPage /> },
];