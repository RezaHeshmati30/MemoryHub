import React, { useContext, useEffect, useState } from "react";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import PracticeButtons from "../components/PracticeButtons";
import CardFilter from "../components/CardFilter";
import BackLink from "../components/BackLink";
import arrow from "../assets/images/arrow-forward.svg";
import FinishPracticeWindow from "../components/FinishPracticeWindow";

function Practice() {
  const {
    currentIndex,
    isFlipped,
    setIsFlipped,
    handleNextCard,
    handlePreviousCard,
    setCurrentIndex,
    isRoundFinished,
    setIsRoundFinished
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
      setIsRoundFinished(false);
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

  console.log("studyset:", currentStudySet)

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

  const circleBg = (cardStatus) => {
    if (cardStatus === "mastered") return "bg-[#69CA61]";
    if (cardStatus === "need practice") return "bg-[#FFD344]";
    if (cardStatus === "not studied") return "bg-[#FF5E5E]";
  };
  

  return (
    !loading && (
      <div>
        {hasToken && (
        <section className="max-container padding-container relative">
          <FinishPracticeWindow />
          <div className="flex justify-between items-center mb-[32px]">
              <div className="basis-[30%]">
                <BackLink />
              </div>
              {console.log("wtf:", currentStudySet?.studySet?.createdBy)}
              <p className='basis-[30%] text-center text-[3em] text-leading-[120%]'>{currentStudySet?.studySet?.title}</p>
              <div className="basis-[30%] flex flex-col items-end">
                <p className='text-right dm-sans-bold text-[1.7em]'>{currentStudySet?.topic?.title}</p>
              </div>
          </div>
          <div className="flex gap-[65px]">
            <div className="flex flex-col items-start justify-start gap-[8px]">
              <p className="text-[1.7em] dm-sans-bold">Cards I want to learn</p>
              <CardFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                handleFilterChange={handleFilterChange}
              />
            </div>
            {noCardsMessage && <p className="text-[1.6em] my-[8px]">{noCardsMessage}</p>}
            {currentCardsSet?.length > 0 && (
              <>
                <div key={currentStudySet._id}>
                  <div
                    className="flip-container flex justify-center"
                    onClick={handleFlip}
                  >
                    <div
                      className={`flip-card ${
                        isFlipped ? "flipped" : ""
                      } w-[60vw] min-h-[50vh]`}
                    >
                      <div className="flip-content flex flex-col justify-between pt-[40px] px-[32px] pb-[32px]">
                        <div className={filterStatus === "all" ? "flex items-center gap-[8px]" : "hidden"}>
                          <div className={`w-[13px] h-[13px] rounded-full ${circleBg(currentCard?.status)}`}></div>
                          <p>{currentCard?.status}</p>
                        </div>
                        <p className="text-[2em] text-leading-[100%]">{currentCard?.card?.question}</p>
                        <img src={currentCard?.card?.image} alt="" />
                        <p className="text-[1.4em] text-leading-[150%] self-center">Show the answer</p>
                      </div>
                      <div className="flip-content flex flex-col justify-between pt-[40px] px-[32px] pb-[32px]">
                        <p className="text-[2em] text-leading-[100%]">{currentCard?.card?.answer}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-[60vw] justify-center gap-[40px] items-center mx-auto mt-[21px] mb-[70px]'>
                    <button
                      onClick={() => handlePreviousCard(currentCardsSet)}
                    >
                      <img src={arrow} alt="previous" className="rotate-180" />
                    </button>
                    <p className='text-[1.7em] dm-sans-bold'>
                      {currentIndex + 1}/{currentCardsSet?.length}
                    </p>
                    <button
                      onClick={() => handleNextCard(currentCardsSet)}
                    >
                      <img src={arrow} alt="next" />
                    </button>
                  </div>
                  <PracticeButtons currentSet={currentCardsSet} />
                </div>
                
              </>
            )}
          </div>
          {/* <button
            className="bg-blue-400 p-[10px] rounded-md"
            onClick={() => navigate(`/user/${user?._id}/studySets`)}
          >
            Back to Study Sets
          </button> */}
          
        </section>
        )}
      </div>
    )
  );
}
export default Practice;
