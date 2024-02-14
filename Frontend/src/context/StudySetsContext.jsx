import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StudySetsContext = createContext();

const StudySetsContextProvider = ({ children }) => {
    const [studySet, setStudySet] = useState({});
    const backendApiUrl = "http://localhost:3001";
    const studySetId = "65cc95d05aad521034286b77";
    const [cardsId, setCardsId] = useState("");
    const [topicId, setTopicId] = useState("");
    

    const getStudySetData = async () => {
        const response = await axios.get(`${backendApiUrl}/studySet/${studySetId}`);
        console.log(response.data);
        setStudySet(response.data);
    }

    return (
        <StudySetsContext.Provider
            value={{
                getStudySetData, studySet, cardsId, setCardsId, topicId, setTopicId
            }}
        >
            {children}
        </StudySetsContext.Provider>
    );
}

export { StudySetsContext, StudySetsContextProvider };