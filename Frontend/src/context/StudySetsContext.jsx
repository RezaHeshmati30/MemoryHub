import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StudySetsContext = createContext();

const StudySetsContextProvider = ({ children }) => {
  const [moduleData, setModuleData] = useState({});
  const backendApiUrl = "http://localhost:3001";
  const moduleId = "65cf67756f6a0e0ef199b5ca";
  const [studySetId, setStudySetId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [cardIds, setCardIds] = useState([]);

  const getModuleData = async () => {
    const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
    console.log(response.data);
    setModuleData(response.data);
  };

  const addStudySetToUser = async (userId, studySetId, topicTitle) => {
    const studySetData = {
      topicTitle: topicTitle,
      studySetId: studySetId,
    };
    try {
      await axios.patch(`${backendApiUrl}/users/${userId}`, studySetData);
      console.log(`studySetData ${studySetData} sent to user ${userId}`);
    } catch (error) {
      console.log("error while logging in:", error);
      alert("Study set already exists in your account");
    }
  };

  const createStudySetsAndCards = async (
    title,
    description,
    questions,
    answers,
    images
  ) => {
   

    try {
      const createStudySetsAndCardsResponse = await axios.post(
        `${backendApiUrl}/create`,
        {
          studySetData: [
            {
              title: title,
              description: description,
              cards: [],
            },
          ],
        }
      );
      console.log("here is it")
      // const newStudySetId = createStudySetsAndCardsResponse?.data.studySetId;
      // console.log("newStudySetId", newStudySetId); 
      // console.log("cards", questions, answers);
      // if (setStudySetId && setTopicId) {
      //   setStudySetId(newStudySetId);
      //   setTopicId(topicId);
      // } else {
      //   console.error("Context functions not available.");
      // }
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
      if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  };

  return (
    <StudySetsContext.Provider
      value={{
        getModuleData,
        moduleData,
        studySetId,
        setStudySetId,
        topicId,
        setTopicId,
        addStudySetToUser,
        createStudySetsAndCards,
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};

export { StudySetsContext, StudySetsContextProvider };
