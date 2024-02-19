import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

function UserStatistic() {
    const {getUserInfo, user} = useContext(AuthContext);

    useEffect(() => {
        getUserInfo();
      }, []);

      const numberOfStudySets = user?.savedStudySets?.length ?? 0;
  

      const countCardsByStatus = () => {
        const cardsCount = { mastered: 0, needPractice: 0, notStudied: 0 };

        user?.savedStudySets?.forEach(savedStudySet => {
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

    const cardsCount = countCardsByStatus();
      



  return (
    <section>
        <h2>Number of study sets: {numberOfStudySets} </h2>
        <p>Mastered: {cardsCount.mastered}</p>
        <p>Need practice: {cardsCount.needPractice}</p>
        <p>Not studied: {cardsCount.notStudied}</p>
</section>
  )
}

export default UserStatistic