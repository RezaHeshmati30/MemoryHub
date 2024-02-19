import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext'
import { AuthContext } from '../context/AuthContext';

function Cards() {
  const {getModuleData, topicId, studySetId, moduleData } = useContext(StudySetsContext);
  const {hasToken} = useContext(AuthContext);

  useEffect(() => {
    getModuleData();
    console.log("Topic Id:", topicId)
    console.log("StudySet Id:", studySetId)
  }, []);


  return (
    <section>
      <ul>
        {moduleData?.topics?.filter(topic => topic._id === topicId)[0]?.studySets.filter(studySet => studySet._id === studySetId).map(cards => (
          <li key={cards._id}>
            {console.log("CARDS:", cards)}
            <p>Title: {cards.title}</p>
            <p>Description: {cards.description}</p>
            <ul className='mt-[30px]'>
              {cards.cards.map((card, index) => (
                <li key={card._id} className='mt-[20px]'>
                  <p>Question {index + 1}: {card.question}</p>
                  <p>Answer: {card.answer}</p>
                </li>
              ))}
            </ul>
            <button className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}>Add to your set</button>
          </li>
        ) )}
      </ul>
    </section>
  )
}

export default Cards
