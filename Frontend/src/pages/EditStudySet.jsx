import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";

const EditStudySet = () => {
  const { editStudySet, deleteCard } = useContext(StudySetsContext);
  const { id } = useParams();
  const { userId, user, getUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updatedTopicTitle, setUpdatedTopicTitle] = useState("savedStudySet?.topic?.title");

  const savedStudySet = user?.savedStudySets?.find(
    (studySet) => studySet._id === id
  );
  console.log("User initial StudySet:", savedStudySet);
  const [topicId, setTopicId] = useState(savedStudySet?.topic?._id || "");
  const cardsDefault = savedStudySet?.cards || [];
  const cardsInfo = cardsDefault
    .map((cardSet) => ({
      question: cardSet.card?.question,
      answer: cardSet.card?.answer,
      id: cardSet.card?._id,
    }))
    .sort((a, b) => (a.id > b.id ? 1 : -1));

  const [formState, setFormState] = useState({
    topicTitle: savedStudySet?.topic?.title || "",
    title: savedStudySet?.studySet?.title || "",
    description: savedStudySet?.studySet?.description || "",
    cards: cardsInfo,
  });

  useEffect(() => {
    getUserInfo();
    setFormState((prevState) => ({
      ...prevState,
      topicTitle: savedStudySet?.topic?.title || "",
      title: savedStudySet?.studySet?.title || "",
      description: savedStudySet?.studySet?.description || "",
      cards: cardsInfo,
    }));
  //console.log("loaded topicid:",topicId);
  }, [id, JSON.stringify(cardsDefault)]);
  
  const topicHandler = async(e) => {
    const chosenTopic = await e.target.value;
    setUpdatedTopicTitle(chosenTopic);
    setFormState((prevState) => ({
      ...prevState,
      topicTitle: chosenTopic,
    }));
    console.log("event from dropdown or topic writing:", chosenTopic);
    console.log("formState after changing topic:", formState);
    console.log("updatedtopictitle after changing topic:", updatedTopicTitle);
  };

  const topicIdFinder = async() => {
    const foundTopic = await user?.savedStudySets
      ?.map((eachSet) => eachSet.topic)
      .find((eachTopic) => eachTopic.title === updatedTopicTitle);
    console.log("Found Topic:", foundTopic);
    if (foundTopic) {
      const foundTopicId = foundTopic._id;
      console.log(" found topic id:", foundTopicId);
      setTopicId(foundTopicId);
      console.log("topic is already existed",foundTopicId)
    } else {
      console.log("topic is new. The current topicId is:",topicId )
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      topicIdFinder();
      await editStudySet(
        userId,
        topicId,
        savedStudySet?.studySet?._id || "",
        formState.topicTitle,
        formState.title,
        formState.description,
        formState.cards
      );
      console.log("sent final formstate:", formState)
    } catch (error) {
      console.error("Error updating study set:", error.message);
    }
  };

  useEffect(() => {
    console.log("After State Update:", topicId, formState.topicTitle);
  }, [topicId, formState.topicTitle]);



  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCardChange = (index, field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      cards: prevState.cards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [field]: value } : card
      ),
    }));
  };

  const handleAddCard = () => {
    setFormState((prevState) => ({
      ...prevState,
      cards: [...prevState.cards, { question: "", answer: "" }],
    }));
  };

  const handleRemoveCard = async (cardId) => {
    const success = await deleteCard(userId, topicId, cardId);
    getUserInfo();
    if (success) {
      console.log("Card deleted successfully");
    } else {
      console.error("Error deleting card");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form
        className='bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}
      >
        <h2 className='text-center text-lg font-bold mb-4'>Edit Study Set</h2>
        <div className='mb-4 flex'>
          <label
            htmlFor='topicTitle'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Topic
            <input
              type='text'
              name='topicTitle'
              value={formState.topicTitle}
              onChange={topicHandler}
            />
          </label>

          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='topicDropdown'
          >
            Select Topic
            <select
              id='topicDropdown'
              name='topicDropdown'
              //value={formState.topicTitle}
              onChange={topicHandler}
              className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option>Select Topic</option>
              {user?.savedStudySets
                ?.map((studySet) => studySet.topic)
                .map((topic) => (
                  <option key={topic._id} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Enter title'
            name='title'
            value={formState.title}
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            placeholder='Enter description'
            name='description'
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        {formState?.cards &&
          formState.cards.map((card, index) => (
            <div
              key={index}
              className='flex flex-wrap justify-between mb-4 relative'
            >
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor={`question${index + 1}`}
                >
                  Question {index + 1}
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id={`question${index + 1}`}
                  type='text'
                  placeholder={`Enter question ${index + 1}`}
                  name={`question${index + 1}`}
                  value={card.question}
                  onChange={(e) =>
                    handleCardChange(index, "question", e.target.value)
                  }
                />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor={`answer${index + 1}`}
                >
                  Answer {index + 1}
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id={`answer${index}`}
                  type='text'
                  placeholder={`Enter answer ${index + 1}`}
                  name={`answer${index + 1}`}
                  value={card.answer}
                  onChange={(e) =>
                    handleCardChange(index, "answer", e.target.value)
                  }
                />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'></div>
              <button
                className='absolute right-0 top-0 mt-2 mr-2 text-red-600 hover:text-red-700 focus:outline-none'
                type='button'
                onClick={() => handleRemoveCard(card.id)}
              >
                X
              </button>
            </div>
          ))}
        <div className='flex justify-between'>
          <button
            className='bg-blue-900 hover:shadow-md cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={handleAddCard}
          >
            Add new Card
          </button>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Save Set
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudySet;
