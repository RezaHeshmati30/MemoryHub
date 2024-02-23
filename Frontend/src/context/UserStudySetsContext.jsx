import { createContext, useState } from "react";
import axios from "axios";


const UserStudySetsContext = createContext();

const UserStudySetsContextProvider = ({ children }) => {
    const [studySetId, setStudySetId] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState({});
    const [isFlipped, setIsFlipped] = useState(false); 
    const [round, setRound] = useState(1);
    // const backendApiUrl = "http://localhost:3001";
    const backendApiUrl = import.meta.env.VITE_SERVER_URL;


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

    const handleNextCard = (cardsArray) => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === cardsArray?.length - 1) {
            return prevIndex;
          }
          const newIndex = (prevIndex + 1) % cardsArray?.length;
          setIsFlipped(false);
          return newIndex;
        });
      };
      

      const handlePreviousCard = (cardsArray) => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === 0) {
            return prevIndex;
          }
          const newIndex = (prevIndex - 1 + cardsArray?.length) % cardsArray?.length;
          setIsFlipped(false);
          return newIndex;
        });
      };
      
    
    
    return (
    <UserStudySetsContext.Provider
        value={{
            studySetId, setStudySetId, countCardsByStatus, deleteSavedStudySet, currentIndex, setCurrentIndex,
            currentCard, setCurrentCard, backendApiUrl, isFlipped, setIsFlipped, handleNextCard, handlePreviousCard, round, setRound
        }}
    >
        {children}
    </UserStudySetsContext.Provider>
);
}

export { UserStudySetsContext, UserStudySetsContextProvider };