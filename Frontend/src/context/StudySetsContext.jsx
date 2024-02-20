import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const StudySetsContext = createContext();

const StudySetsContextProvider = ({ children }) => {
    const [moduleData, setModuleData] = useState({});
    const backendApiUrl = "http://localhost:3001";
    const moduleId = "65cf67756f6a0e0ef199b5ca";
    const [studySetId, setStudySetId] = useState("");
    const [topicId, setTopicId] = useState("");



    const getModuleData = async () => {
        const response = await axios.get(`${backendApiUrl}/modules/${moduleId}`);
        console.log(response.data);
        setModuleData(response.data);
    }

    const addStudySetToUser = async(userId, studySetId, topicTitle) => {
        const studySetData = {
            topicTitle: topicTitle,
            studySetId: studySetId, 
            status: "no"  
        }
        try {
            await axios.patch(`${backendApiUrl}/users/${userId}`, studySetData);
            console.log(`studySetData ${studySetData} sent to user ${userId}`);
        } catch (error) {
            console.log("error while logging in:", error);
            alert("Study set already exists in your account")
        }
    }



    return (
        <StudySetsContext.Provider
            value={{
                getModuleData, moduleData, studySetId, setStudySetId, topicId, setTopicId, addStudySetToUser,
            }}
        >
            {children}
        </StudySetsContext.Provider>
    );
}

export { StudySetsContext, StudySetsContextProvider };