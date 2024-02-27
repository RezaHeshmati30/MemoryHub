import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import StudySets from "../pages/StudySets";
import CreateSets from "../pages/CreateSets";
import StudySet from "../pages/StudySet";
import Contact from "../pages/Contact";
import UserStudySets from "../pages/UserStudySets";
import UserStudySet from "../pages/UserStudySet";
import EditStudySet from "../pages/EditStudySet";
import Practice from "../pages/Practice";
import EndPractice from "../pages/EndPractice";
import LearnCards from "../pages/LearnCards";




const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/userProfile', element: <UserProfile />},
      { path: '/user/studySets', element: <UserStudySets />},
      { path: '/user/studySet/:id', element: <UserStudySet />},
      { path: '/user/studySet/learn-cards/:id', element: <LearnCards />},
      { path: '/studySets', element: <StudySets />},
      { path: '/studySet/:topicId/:studySetId', element: <StudySet />},
      { path: '/createSet/', element: <CreateSets />},
      { path: '/studySet/edit/:id', element: < EditStudySet/>},
      { path: '/studySet/practice/:id', element: <Practice />},
      // { path: '/studySet/learn-cards/:id', element: <LearnCards />},
      { path: '/studySet/endPractice/:id', element: <EndPractice />},
      { path: '/contact', element: <Contact />},
      { path: '*', element: <PageNotFound />},
    
    ],
  },
]);

export default router;
