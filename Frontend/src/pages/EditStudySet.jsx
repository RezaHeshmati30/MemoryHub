import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import Back from "../components/Back";

const EditStudySet = () => {
  const { editStudySet, deleteCard } = useContext(StudySetsContext);
  const { readImageAsBase64 } = useContext(UserStudySetsContext);
  const { id } = useParams();
  const { userId, user, getUserInfo, hasToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedStudySet = user?.savedStudySets?.find(
    (studySet) => studySet._id === id
  );
  const [updatedTopicTitle, setUpdatedTopicTitle] = useState(
    savedStudySet?.topic?.title
  );

  const studySetId = savedStudySet?.studySet?._id || "";

  const [topicId, setTopicId] = useState(savedStudySet?.topic?._id || "");

  const cardsDefault = savedStudySet?.cards || [];
  cardsDefault.sort((a, b) => (a.card?._id > b.card?._id ? 1 : -1));
  const cardsInfo = cardsDefault.map((cardSet) => ({
    question: cardSet.card?.question,
    answer: cardSet.card?.answer,
    image: cardSet?.card?.image,
    id: cardSet.card?._id,
  }));

  const [formState, setFormState] = useState({
    topicTitle: savedStudySet?.topic?.title || "",
    title: savedStudySet?.studySet?.title || "",
    description: savedStudySet?.studySet?.description || "",
    cards: cardsInfo,
  });

  useEffect(() => {
    if (!hasToken) {
      navigate("/");
    } else {
      getUserInfo();
      setFormState((prevFormState) => ({
        ...prevFormState,
        topicTitle: savedStudySet?.topic?.title || "",
        title: savedStudySet?.studySet?.title || "",
        description: savedStudySet?.studySet?.description || "",
        cards: cardsInfo,
      }));
    }
  }, [userId]);

  const topicHandler = (e) => {
    const chosenTopic = e.target.value;
    setUpdatedTopicTitle(chosenTopic);
    setFormState((prevState) => ({
      ...prevState,
      topicTitle: chosenTopic,
    }));
  };

  const topicIdFinder = async () => {
    const foundTopic = await user?.savedStudySets
      ?.map((eachSet) => eachSet?.topic)
      .find((eachTopic) => eachTopic?.title === updatedTopicTitle);
    if (foundTopic) {
      const foundTopicId = foundTopic?._id;
      setTopicId(foundTopicId);
    } else {
      console.log("topic is new. The current topicId is:", topicId);
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
      getUserInfo();
      alert("Study Set updated successfully");
      navigate("/user/:id/studySets");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (file, index) => {
    try {
      const base64Data = await readImageAsBase64(file);
      setFormState((prevFormState) => ({
        ...prevFormState,
        cards: prevFormState.cards.map((card, cardIndex) =>
          cardIndex === index ? { ...card, image: base64Data } : card
        ),
      }));
      console.log("FORM", formState);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCardChange = async (index, field, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      cards: prevFormState.cards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [field]: value } : card
      ),
    }));
  };

  const handleAddCard = () => {
    setFormState({
      ...formState,
      cards: [...formState.cards, { question: "", answer: "", image: "" }],
    });
  };

  const handleRemoveCard = async (cardId) => {
    const success = await deleteCard(userId, studySetId, cardId);
    getUserInfo();
    if (success) {
      console.log("Card deleted successfully");
    } else {
      console.error("Error deleting card");
    }
  };

  return (
    <div className='flex justify-center items-center '>
      {hasToken && (
        <form
          className='bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
         <Back/>
          <h2 className='text-center text-lg font-bold mb-4'>Edit Study Set</h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='topicTitle'
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
                onChange={topicHandler}
                className='border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                <option>Select Topic</option>
                {[
                  ...new Set(
                    user?.savedStudySets?.map(
                      (studySet) => studySet.topic?.title
                    )
                  ),
                ].map((topicTitle) => (
                  <option key={topicTitle} value={topicTitle}>
                    {topicTitle}
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
                <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor={`image${index}`}
                  >
                    Image {index + 1}
                  </label>
                  <div className='flex gap-[10px]'>
                    <img className='w-[40px]' src={card.image} alt='' />
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id={`image${index}`}
                      type='file'
                      accept='image/*'
                      name={`image${index}`}
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], index)
                      }
                    />
                  </div>
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
      )}
    </div>
  );
};
export default EditStudySet;

