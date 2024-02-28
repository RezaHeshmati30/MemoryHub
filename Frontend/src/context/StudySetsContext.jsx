import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const StudySetsContext = createContext();

const StudySetsContextProvider = ({ children }) => {
  const [moduleData, setModuleData] = useState({});
  const [studySetId, setStudySetId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  //const[topicTitle, setTopicTitle] = useState("");
  //const [studySets, setStudySets] = useState([]);
  const moduleId = "65cf67756f6a0e0ef199b5ca";

  // const backendApiUrl = "http://localhost:3001";
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

    const getModuleData = async () => {
        const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
        console.log(response.data);
        setModuleData(response.data);
    }

    const getStudySets = async () => {
      
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
////?answer with Michael====>
  // const createStudySetsAndCards = async (userId, title, description, cards) => {
  //   console.log("userid from from:", userId);
  //   console.log("cards in ceratestudyset:", cards);
  //   try {
  //     const studySetData = {
  //       title: title,
  //       description: description,
  //       cards: cards.map((card, index) => [
  //         {
  //           question: card.question,
  //           answer: card.answer,
  //         },
  //       ]),
  //     };
  //     console.log("axios url:", `${backendApiUrl}/createSet/${userId}`);
  //     console.log("studyset:", studySetData);

  //     const response = await axios.post(
  //       `${backendApiUrl}/createSet/${userId}`,
  //       { ...studySetData }
  //     );
  //     console.log("Study set created successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error creating study sets and cards:", error);
  //     if (error.response) {
  //       console.log("Response Data from backend:", error.response.data);
  //     }

  //     throw error;
  //   }
  // };
  const createStudySetsAndCards = async (userId, topicTitle, title, description, createdBy, cards) => {
    console.log("userid from from:", userId);
    try {
      const savedStudySets = {
        topicTitle: topicTitle,
        title: title,
        description: description,
        createdBy: createdBy,
        cards: cards.map(card => ({
          question: card.question,
          answer: card.answer
        }))
      };

      console.log("savedStudySets:", { ...savedStudySets });
      const response = await axios.post(
        `${backendApiUrl}/createSet/${userId}`,
        { ...savedStudySets }
      );
      setLoading(true);
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
      }

      throw error;
    }
  };


  const editStudySet = async (
    userId,
    topicId,
    studySetId,
    topic,
    title,
    description,
    cardsInfo
    
  ) => {
    try {
      const updatedStudySets = {
        topic: topic,
        title: title,
        description: description,
        cards: cardsInfo,
      };
  
      const response = await axios.patch(
        `${backendApiUrl}/editSet/${userId}/${topicId}/${studySetId}`,
        { ...updatedStudySets },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);
      console.log("Study set updated successfully!");
    } catch (error) {
      console.error("Error updating study set:", error.message);

      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
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
        editStudySet,
        loading,
        setLoading,
     
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};

export { StudySetsContext, StudySetsContextProvider };

