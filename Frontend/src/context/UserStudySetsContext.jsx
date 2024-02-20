import { createContext, useState } from "react";

const UserStudySetsContext = createContext();

const UserStudySetsContextProvider = ({ children }) => {
    const [studySetId, setStudySetId] = useState("");

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
    
    
    return (
    <UserStudySetsContext.Provider
        value={{
            studySetId, setStudySetId, countCardsByStatus
        }}
    >
        {children}
    </UserStudySetsContext.Provider>
);
}

export { UserStudySetsContext, UserStudySetsContextProvider };