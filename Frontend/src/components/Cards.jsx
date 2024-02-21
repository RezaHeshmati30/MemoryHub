import React, { useContext, useEffect, useState } from "react";
import { StudySetsContext } from "../context/StudySetsContext";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "./cards.css";

function Cards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getModuleData,  moduleData, addStudySetToUser} = useContext(StudySetsContext);
  const { hasToken, getUserInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {topicId} = useParams();
  const {studySetId} = useParams();


  useEffect(() => {
    getModuleData();
    getUserInfo();
  }, []);

  const currentCardsSet =
    moduleData?.topics
      ?.filter((topic) => topic._id === topicId)[0]
      ?.studySets.filter((set) => set._id === studySetId)[0];   
      
  const topicTitle = moduleData?.topics?.filter((topic) => topic._id === topicId)[0].title;    

  const currentCard = currentCardsSet?.cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length);
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
    setIsFlipped(!isFlipped);
  };
    

  return (
    <div>
      <section className='w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10'>
        {currentCardsSet && (
          <div key={currentCardsSet._id}>
            {console.log("CARDS:", currentCardsSet)}
            <p>Title: {currentCardsSet.title}</p>
            <p>Description: {currentCardsSet.description}</p>
            <div
              className='flip-container flex justify-center'
              onClick={handleFlip}
            >
              <div
                className={`flip-card ${
                  isFlipped ? "flipped" : ""
                } w-[60vw] h-[50vh]`}
              >
                <div className='flip-content'>
                  <strong>Question</strong>
                  <p> {currentCard?.question}</p>
                </div>
                <div className='flip-content'>
                  <strong>Answer</strong>
                  <p>{currentCard?.answer}</p>
                </div>
              </div>
            </div>
            <div className='my-5 ml-[110px]'>
              <button
                onClick={handlePreviousCard}
                className='bg-gray-400  p-[10px] rounded-md'
              >
                Previous
              </button>
              <button
                onClick={handleNextCard}
                className='bg-gray-400 mx-10 p-[10px] rounded-md'
              >
                Next
              </button>
            </div>
          </div>
        )}
        <button
          className='bg-blue-400 p-[10px] rounded-md'
          onClick={() => navigate("/studySets")}
        >
          back to Study Sets
        </button>
        <button
          className={`${hasToken ? "block" : "hidden"} bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px]`}
          onClick={() => {addStudySetToUser(user._id, currentCardsSet._id, topicTitle)} }
        >
          Add to your set
        </button>
      </section>
    </div>
  );
}

export default Cards;
