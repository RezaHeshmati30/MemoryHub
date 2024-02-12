import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import Subjects from "../pages/Subjects"



const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/userProfile', element: <UserProfile />},
      { path: '/subjects', element: <Subjects />},
      { path: '*', element: <PageNotFound />},
    ],
  },
]);

export default router;
