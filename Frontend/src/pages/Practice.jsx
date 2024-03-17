import React, { useContext, useEffect, useState } from "react";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PracticeButtons from "../components/PracticeButtons";
import CardFilter from "../components/CardFilter";

function Practice() {
  const {
    currentIndex,
    isFlipped,
    setIsFlipped,
    handleNextCard,
    handlePreviousCard,
    setCurrentIndex,
  } = useContext(UserStudySetsContext);
  const { hasToken, getUserInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [filterStatus, setFilterStatus] = useState("all");
  const [noCardsMessage, setNoCardsMessage] = useState("");
  const [currentCardsSet, setCurrentCardsSet] = useState([]);
  const [currentStudySet, setCurrentStudySet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasToken) {
    async function fetchData() {
      await getUserInfo();
      setCurrentIndex(0);
      setLoading(false); // Set loading to false once user data is fetched
    }
    fetchData();
  } else {
    navigate("/");
  }
  }, []);
  useEffect(() => {
    if (user) {
      const studySet =
        user.savedStudySets?.find((studySet) => studySet._id === id) || {};
      setCurrentStudySet(studySet);
      setCurrentCardsSet(studySet.cards || []);
    }
  }, [user, id]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filterStatus]);

  useEffect(() => {
    if (filterStatus === "all") {
      getUserInfo();
      const studySet =
        user?.savedStudySets?.find((studySet) => studySet._id === id) || {};
      setCurrentStudySet(studySet);
      const allCards = studySet?.cards || [];
      setCurrentCardsSet(allCards);
    }
  }, [currentIndex]);
  useEffect(() => {
    if (currentCardsSet.length === 0) {
      setNoCardsMessage("No cards available for the selected filter.");
    } else {
      setNoCardsMessage("");
    }
  }, [currentCardsSet]);
  const currentCard = currentCardsSet[currentIndex];
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilterStatus(selectedValue);
    let filteredCards = currentStudySet.cards || [];
    if (selectedValue === "mastered") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "mastered"
      );
    } else if (selectedValue === "need practice") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "need practice"
      );
    } else if (selectedValue === "not studied") {
      filteredCards = filteredCards.filter(
        (card) => card.status === "not studied"
      );
    } else if (selectedValue === "not studied and need practice") {
      filteredCards = filteredCards.filter(
        (card) =>
          card.status === "need practice" || card.status === "not studied"
      );
    }
    setCurrentCardsSet(filteredCards);
  };
  return (
    !loading && (
      <div>
        {hasToken && (
        <section className="w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10">
          <CardFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleFilterChange={handleFilterChange}
          />
          {noCardsMessage && <p>{noCardsMessage}</p>}
          {currentCardsSet?.length > 0 && (
            <>
              <div key={currentStudySet._id}>
                <p>Title: {currentStudySet?.studySet?.title}</p>
                <p>Description: {currentStudySet?.studySet?.description}</p>
                <p className={filterStatus === "all" ? "block" : "hidden"}>
                  Status: {currentCard?.status}
                </p>
                <div
                  className="flip-container flex justify-center"
                  onClick={handleFlip}
                >
                  <div
                    className={`flip-card ${
                      isFlipped ? "flipped" : ""
                    } w-[60vw] h-[50vh]`}
                  >
                    <div className="flip-content text-center pt-10 gap-5">
                      <strong>Question</strong>
                      <p>{currentCard?.card?.question}</p>
                      <img src={currentCard?.card?.image} alt="" className="w-[200px] h-auto mx-auto"/>
                    </div>
                    <div className="flip-content">
                      <strong>Answer</strong>
                      <p>{currentCard?.card?.answer}</p>
                    </div>
                  </div>
                </div>
                <div className="my-5 ml-[110px] flex gap-[10px]">
                  <button
                    onClick={() => handlePreviousCard(currentCardsSet)}
                    className="bg-gray-400 p-[10px] rounded-md"
                  >
                    Previous
                  </button>
                  <p>
                    {currentIndex + 1} / {currentCardsSet?.length}
                  </p>
                  <button
                    onClick={() => handleNextCard(currentCardsSet)}
                    className="bg-gray-400 mx-10 p-[10px] rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
          <button
            className="bg-blue-400 p-[10px] rounded-md"
            onClick={() => navigate(`/user/${user?._id}/studySets`)}
          >
            Back to Study Sets
          </button>
          <PracticeButtons currentSet={currentCardsSet} />
        </section>
        )}
      </div>
    )
  );
}
export default Practice;
