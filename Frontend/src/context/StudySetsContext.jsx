import React, { createContext, useContext, useState } from "react";
import axios from "axios";
//import { AuthContext } from "./AuthContext";
const StudySetsContext = createContext();
const StudySetsContextProvider = ({ children }) => {
  //const { userId } = useContext(AuthContext);
  const [moduleData, setModuleData] = useState({});
  const backendApiUrl = "http://localhost:3001";
  const [studySetId, setStudySetId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [cardIds, setCardIds] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const moduleId = "65cf67756f6a0e0ef199b5ca";
  const getModuleData = async () => {
    const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
    console.log(response.data);
    setModuleData(response.data);
}
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
  const createStudySetsAndCards = async (userId, title, description, cards) => {
    console.log("userid from from:", userId);
    console.log("cards in ceratestudyset:", cards);
    try {
      const studySetData = {
        title: title,
        description: description,
        cards: cards.map((card, index) => [
          {
            question: card.question,
            answer: card.answer,
          },
        ]),
      };
      console.log("axios url:", `${backendApiUrl}/createSet/${userId}`);
      console.log("studyset:", studySetData);
      const response = await axios.post(
        `${backendApiUrl}/createSet/${userId}`,
        { ...studySetData }
      );
      console.log("Study set created successfully:", response.data);
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
      }
      throw error;
    }
  };
  // const createStudySetsAndCards = async (
  //   userId,
  //   title,
  //   description,
  //   question,
  //   answer
  // ) => {
  //   try {
  //     const response = await axios.post(
  //       `${backendApiUrl}/createSet/${userId}`,
  //       {
  //         studySetData: [
  //           {
  //             topicTitle: moduleData.topicTitle,
  //             title: title,
  //             description: description,
  //             cards: [
  //               {
  //                 question: question,
  //                 answer: answer,
  //               },
  //             ],
  //           },
  //         ],
  //       }
  //     );
  //     console.log("here is it", response.data);
  //   } catch (error) {
  //     console.error("Error creating study sets and cards:", error);
  //     if (error.response) {
  //       console.error("Response Status:", error.response.status);
  //       console.error("Response Data:", error.response.data);
  //     }
  //     throw error;
  //   }
  // };
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
        answer,
        setAnswer,
        image,
        setImage,
        question,
        setQuestion,
        title,
        setTitle,
        description,
        setDescription,
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};
export { StudySetsContext, StudySetsContextProvider };