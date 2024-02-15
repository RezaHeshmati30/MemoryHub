// import React, { useContext, useEffect, useState } from "react";
// import { StudySetsContext } from "../context/StudySetsContext";

// function Cards() {
//   const [flip, setFlip] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const { getStudySetData, topicId, cardsId, studySet } =
//     useContext(StudySetsContext);

//   useEffect(() => {
//     getStudySetData();
//     console.log("Topic Id:", topicId);
//     console.log("Cards Id:", cardsId);
//   }, []);

//   const currentCardsSet = studySet?.topics
//     ?.filter((topic) => topic._id === topicId)[0]
//     ?.studySets.filter((set) => set._id === cardsId)[0];

//   const currentCard = currentCardsSet.cards[currentIndex];

//   const handleNextCard = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
//     );
//     setFlip(false);
//   };

//   const handlePreviousCard = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + currentCardsSet?.cards.length) %
//         currentCardsSet?.cards.length
//     );
//     setFlip(false);
//   };
//   const handleFlip = () => {
//     setFlip((prevFlip) => !prevFlip);
//   };

//   return (
//     <section>
//       <ul>
//         {currentCard && (
//           <li key={currentCard._id}>
//             <p>Title: {currentCardsSet.title}</p>
//             <p>Description: {currentCardsSet.description}</p>
//             <div className="w-[500px] h-[500px] bg-gray-200 m-10">
//               <ul onClick={handleFlip} className='mt-[30px]'>
//                 <li key={currentCard._id} className='mt-[20px]'>
//                   {!flip ? (
//                     <p >Answer: {currentCard.answer}</p>
//                   ) : (
//                     <p >
//                       Question: {currentCard.question}
//                     </p>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </li>
//         )}
//       </ul>
//       <button
//         onClick={handlePreviousCard}
//         className='bg-blue-500 m-5 p-2 rounded-md'
//       >
//         Previous
//       </button>
//       <button
//         onClick={handleNextCard}
//         className='bg-red-500 m-5 p-2 rounded-md'
//       >
//         Next
//       </button>
//     </section>
//   );
// }

// export default Cards;

import React, { useContext, useEffect, useState} from "react";
import { StudySetsContext } from "../context/StudySetsContext";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { getStudySetData, topicId, cardsId, studySet } =
    useContext(StudySetsContext);

  useEffect(() => {
    getStudySetData();
    console.log("Topic Id:", topicId);
    console.log("Cards Id:", cardsId);
  }, []);

  const currentCardsSet = studySet?.topics
    ?.filter((topic) => topic._id === topicId)[0]
    ?.studySets.filter((set) => set._id === cardsId)[0];

  const currentCard = currentCardsSet?.cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
    );
    setIsFlipped(false);
  };

  const handlePreviousCard = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentCardsSet?.cards.length) %
        currentCardsSet?.cards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <section>
      <section>
        {currentCard && (
          <div>
            <p>Title: {currentCardsSet.title}</p>
            <p>Description: {currentCardsSet.description}</p>
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection='vertical'
              flipSpeedBackToFront={1}
              flipSpeedFrontToBack={1}
            >
              <div key='front' className='m-[30px] ' onClick={handleFlip}>
                <div className='m-[50px] w-[500px] h-[500px] bg-slate-300 text-center'>
                  <p className='text-xl m-[50px] p-[100px]'>Question </p>
                  <p className='text-l m-[50px]'> {currentCard.question}</p>
                </div>
              </div>
              <div key='back' className='m-[30px]' onClick={handleFlip}>
                <div className='m-[50px] w-[500px] h-[500px] bg-slate-300 text-center'>
                  <p className=' text-xl p-[100px]'>Answer</p>
                  <p className='text-l m-[50px] '>{currentCard.answer}</p>
                </div>
              </div>
            </ReactCardFlip>
          </div>
        )}
        <button
          onClick={handlePreviousCard}
          className='bg-blue-500 ml-[200px] p-[10px] rounded-md'
        >
          Previous
        </button>
        <button
          onClick={handleNextCard}
          className='bg-red-500 ml-[100px] p-[10px] rounded-md'
        >
          Next
        </button>
      </section>
      <button onClick={() => navigate("/")}></button>
    </section>
  );
}

export default Cards;

// import React, { useContext, useEffect, useState } from "react";
// import { StudySetsContext } from "../context/StudySetsContext";

// function Cards() {
//   const [flip, setFlip] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const { getStudySetData, topicId, cardsId, studySet } =
//     useContext(StudySetsContext);

//   useEffect(() => {
//     getStudySetData();
//     console.log("Topic Id:", topicId);
//     console.log("Cards Id:", cardsId);
//   }, []);

//   const currentCardsSet = studySet?.topics
//     ?.filter((topic) => topic._id === topicId)[0]
//     ?.studySets.filter((set) => set._id === cardsId)[0];

//   const currentCard = currentCardsSet.cards[currentIndex];

//   const handleNextCard = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
//     );
//     setFlip(false);
//   };

//   const handlePreviousCard = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + currentCardsSet?.cards.length) %
//         currentCardsSet?.cards.length
//     );
//     setFlip(false);
//   };
//   const handleFlip = () => {
//     setFlip((prevFlip) => !prevFlip);
//   };

//   return (
//     <section>
//       <ul>
//         {currentCard && (
//           <li key={currentCard._id}>
//             <p>Title: {currentCardsSet.title}</p>
//             <p>Description: {currentCardsSet.description}</p>
//             <div className="w-[500px] h-[500px] bg-gray-200 m-10">
//               <ul onClick={handleFlip} className='mt-[30px]'>
//                 <li key={currentCard._id} className='mt-[20px]'>
//                   {!flip ? (
//                     <p >Answer: {currentCard.answer}</p>
//                   ) : (
//                     <p >
//                       Question: {currentCard.question}
//                     </p>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </li>
//         )}
//       </ul>
//       <button
//         onClick={handlePreviousCard}
//         className='bg-blue-500 m-5 p-2 rounded-md'
//       >
//         Previous
//       </button>
//       <button
//         onClick={handleNextCard}
//         className='bg-red-500 m-5 p-2 rounded-md'
//       >
//         Next
//       </button>
//     </section>
//   );
// }

// export default Cards;
