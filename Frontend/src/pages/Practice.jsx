import React, { useContext, useEffect, useState } from 'react';
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import PracticeButtons from '../components/PracticeButtons';
import CardFilter from '../components/CardFilter';

function Practice() {
  const { currentIndex, isFlipped, setIsFlipped, handleNextCard, handlePreviousCard, setCurrentIndex } = useContext(UserStudySetsContext);
  const { hasToken, getUserInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [filterStatus, setFilterStatus] = useState('all');
  const [noCardsMessage, setNoCardsMessage] = useState('');

  useEffect(() => {
    getUserInfo();
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [currentIndex]);

  const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
  const currentCardsSet = studySet.cards || [];
  const filteredCards = currentCardsSet.filter(card => {
    if (filterStatus === 'all') {
      return true;
    } else if (filterStatus === 'not studied and need practice') {
      return card.status === 'not studied' || card.status === 'need practice';
    } else {
      return card.status === filterStatus;
    }
  });

  useEffect(() => {
    if (filteredCards.length === 0) {
      setNoCardsMessage('No cards available for the selected filter.');
    } else {
      setNoCardsMessage('');
    }
  }, [filteredCards]);

  const currentCard = filteredCards[currentIndex];


  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    const firstIndexWithStatus = filteredCards.findIndex(card => card.status === status);
    setCurrentIndex(firstIndexWithStatus !== -1 ? firstIndexWithStatus : 0);
  };

  return (
    <div>
      <section className='w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10'>
        <CardFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} handleFilterChange={handleFilterChange} /> {/* Filterkomponente verwenden */}
        {noCardsMessage && <p>{noCardsMessage}</p>}
        {filteredCards.length > 0 && (
          <div key={studySet._id}>
            <p>Title: {studySet?.studySet?.title}</p>
            <p>Description: {studySet?.studySet?.description}</p>
            <p>Status: {currentCard?.status}</p>
            <div className='flip-container flex justify-center' onClick={handleFlip}>
              <div className={`flip-card ${isFlipped ? "flipped" : ""} w-[60vw] h-[50vh]`}>
                <div className='flip-content'>
                  <strong>Question</strong>
                  <p>{currentCard?.card?.question}</p>
                </div>
                <div className='flip-content'>
                  <strong>Answer</strong>
                  <p>{currentCard?.card?.answer}</p>
                </div>
              </div>
            </div>
            <div className='my-5 ml-[110px] flex gap-[10px]'>
              <button onClick={() => handlePreviousCard(filteredCards)} className='bg-gray-400 p-[10px] rounded-md'>Previous</button>
              <p>{currentIndex + 1} / {filteredCards?.length}</p>
              <button onClick={() => handleNextCard(filteredCards)} className='bg-gray-400 mx-10 p-[10px] rounded-md'>Next</button>
            </div>
          </div>
        )}
        <button className='bg-blue-400 p-[10px] rounded-md' onClick={() => navigate("/user/studySets")}>Back to Study Sets</button>
        <PracticeButtons />
      </section>
    </div>
  );
}

export default Practice;
