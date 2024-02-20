import { createContext, useState } from "react";
import axios from "axios";


const UserStudySetsContext = createContext();

const UserStudySetsContextProvider = ({ children }) => {
    const [studySetId, setStudySetId] = useState("");
    const backendApiUrl = "http://localhost:3001";


    const countCardsByStatus = (studySets) => {
        const cardsCount = { mastered: 0, needPractice: 0, notStudied: 0 };
    
        studySets?.forEach(savedStudySet => {
            savedStudySet.cards.forEach(card => {
                switch (card.status) {
                    case "mastered":
                        cardsCount.mastered++;
                        break;
                    case "need practice":
                        cardsCount.needPractice++;
                        break;
                    case "not studied":
                        cardsCount.notStudied++;
                        break;
                    default:
                        break;
                }
            });
        });
        return cardsCount;
    };

    const deleteSavedStudySet = async (userId, setId) => {
        try {
            await axios.delete(`${backendApiUrl}/user/${userId}/${setId}`);
            alert("Study set was deleted");
        } catch (error) {
            console.log("error while logging in:", error);
            
        }
    }   
    
    
    return (
    <UserStudySetsContext.Provider
        value={{
            studySetId, setStudySetId, countCardsByStatus, deleteSavedStudySet
        }}
    >
        {children}
    </UserStudySetsContext.Provider>
);
}

export { UserStudySetsContext, UserStudySetsContextProvider };