import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserStudySetsContext } from '../context/UserStudySetsContext';

function UserStatistic() {
    const {getUserInfo, user} = useContext(AuthContext);
    const {countCardsByStatus} = useContext(UserStudySetsContext);

    useEffect(() => {
        getUserInfo();
      }, []);

    const numberOfStudySets = user?.savedStudySets?.length ?? 0;

    const cardsCount = countCardsByStatus(user?.savedStudySets);
      
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