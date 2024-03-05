import React, { createContext, useState } from "react";
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
  const [studyData, setStudyData] = useState([]);
  const [userStudySets, setUserStudySets] = useState({});
  const [userShortData, setUserShortData] = useState({});
  const moduleId = "65cf67756f6a0e0ef199b5ca";

  // const backendApiUrl = "http://localhost:3001";
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

    const getModuleData = async () => {
        const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
        console.log(response.data);
        setModuleData(response.data);
    }

    const getStudyData = async () => {
      const response = await axios.get(`${backendApiUrl}/topics`);
      console.log(response.data);
      setStudyData(response.data);
    }

    const getUserShortData = async (id) => {
      const response = await axios.get(`${backendApiUrl}/users/${id}`);
      console.log(response.data);
      setUserShortData(response.data);
    }

    const getUserStudySets = async (id) => {
      const response = await axios.get(`${backendApiUrl}/user/${id}/studySets`);
      console.log(response.data);
      setUserStudySets(response.data);
    }

  const addStudySetToUser = async (userId, studySetId, topicId) => {
    const studySetData = {
      edit: "no"  
    };
    try {
      await axios.patch(`${backendApiUrl}/users/${userId}/topics/${topicId}/studySets/${studySetId}`, studySetData);
      console.log(`studySetData ${studySetData} sent to user ${userId}`);
      alert("Study set was added to your account");
    } catch (error) {
      console.log("error while logging in:", error);
      alert("Study set already exists in your account");
    }
  };

  const createStudySetsAndCards = async (userId, topic, title, description, createdBy, cards) => {
    console.log("userid from from:", userId);
    try {
      const savedStudySets = {
        topic: topic,
        title: title,
        description: description,
        createdBy: createdBy,
        cards: cards.map(card => ({
          question: card.question,
          answer: card.answer
        }))
      };
      console.log("Request Payload:", { ...savedStudySets });
      const response = await axios.post(`${backendApiUrl}/createSet/${userId}`, { ...savedStudySets });
      
      //console.log("Study set created successfully:", response.data);
    } catch (error) {
      console.error("Error updating study set:", error.message);

      if (error.response) {
        console.log("Response Data from backend:", error.response.data);
      }
      throw error;
    }
  };
  // await editStudySet(
  //   userId,
  //   topicId,
  //   studySetId,
  //   formState.topic,
  //   formState.title,
  //   formState.description,
  //   formState.cards
  // );
  const editStudySet = async (
    userId,
    topicId,
    studySetId,
    topicTitle,
    title,
    description,
    cardsInfo
  ) => {
  
    try {
      const updatedStudySets = {
        topicTitle: topicTitle,
        title: title,
        description: description,
        cards: cardsInfo.map((card) => {
        console.log("card:", card);
          return {
          question: card.question,
          answer: card.answer,
          cardId: card.id,
      }
      })
    }
    console.log("updatedStudySets:", updatedStudySets);
      const response = await axios.patch(
        `${backendApiUrl}/editSet/${userId}/${topicId}/${studySetId}`,
        { ...updatedStudySets },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response);
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
        getStudyData,
        studyData, setStudyData,
        getUserStudySets,
        userStudySets, setUserStudySets,
        userShortData, setUserShortData,
        getUserShortData,
        editStudySet
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};

export { StudySetsContext, StudySetsContextProvider };
