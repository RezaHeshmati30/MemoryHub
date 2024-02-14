import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext'

function Cards() {
  const {getStudySetData, topicId, cardsId, studySet } = useContext(StudySetsContext);

  useEffect(() => {
    getStudySetData();
    console.log("Topic Id:", topicId)
    console.log("Cards Id:", cardsId)
  }, []);


  return (
    <section>
      <ul>
        {studySet?.topics?.filter(topic => topic._id === topicId)[0]?.studySets.filter(studySet => studySet._id === cardsId).map(cards => (
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
          </li>
        ) )}
      </ul>
    </section>
  )
}

export default Cards
