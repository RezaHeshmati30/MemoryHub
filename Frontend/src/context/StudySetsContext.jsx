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

    return (
        <StudySetsContext.Provider
            value={{
                getModuleData, moduleData, studySetId, setStudySetId, topicId, setTopicId
            }}
        >
            {children}
        </StudySetsContext.Provider>
    );
}

export { StudySetsContext, StudySetsContextProvider };