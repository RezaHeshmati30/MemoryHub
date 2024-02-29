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

  const addStudySetToUser = async (userId, studySetId, topicTitle) => {
    const studySetData = {
      topicTitle: topicTitle,
      studySetId: studySetId,
      edit: "no"  
    };
    try {
      await axios.patch(`${backendApiUrl}/users/${userId}`, studySetData);
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
        getStudyData,
        studyData, setStudyData,
        getUserStudySets,
        userStudySets, setUserStudySets,
        userShortData, setUserShortData,
        getUserShortData
      }}
    >
      {children}
    </StudySetsContext.Provider>
  );
};

export { StudySetsContext, StudySetsContextProvider };

