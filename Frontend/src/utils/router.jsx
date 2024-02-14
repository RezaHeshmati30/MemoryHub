import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import StudySets from "../pages/StudySets";
import CreateSets from "../pages/CreateSets";




const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/userProfile', element: <UserProfile />},
      { path: '/studySets', element: <StudySets />},
      { path: '/createSet', element: <CreateSets />},
      { path: '*', element: <PageNotFound />},
    ],
  },
]);

export default router;
