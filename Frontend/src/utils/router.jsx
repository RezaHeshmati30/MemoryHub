import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import StudySets from "../pages/StudySets";
import CreateSets from "../pages/CreateSets";
import StudySet from "../pages/StudySet";
import Contact from "../pages/Contact";




const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/userProfile', element: <UserProfile />},
      { path: '/studySets', element: <StudySets />},
      { path: '/studySet', element: <StudySet />},
      { path: '/createSet', element: <CreateSets />},
      { path: '/contact', element: <Contact />},
      { path: '*', element: <PageNotFound />},
    ],
  },
]);

export default router;
