import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";

const EditStudySet = () => {
  const { editStudySet, studySetId } = useContext(StudySetsContext);
  const { id } = useParams();

  const { userId, user, getUserInfo } = useContext(AuthContext);

  const studySet = user?.savedStudySets?.find(
    (studySet) => studySet._id === id
  );
  const cardsDefault = studySet?.cards || [];
  //const cards = studySet?.cards.map((card) => card._id === id);
  const hasMatchingCard = studySet?.cards.some((card) => card._id === id);

  const topicSet = user?.savedStudySets?.find(
    (studySet) => studySet._id === id
  );
  
  const topicId = topicSet?._id;
  console.log("topicId", topicId);

  const [formState, setFormState] = useState({
    topic: studySet?.topicTitle || "",
    title: studySet?.studySet?.title || "",
    description: studySet?.studySet?.description || "",
    cards: (studySet?.studySet?.cards || []).map(cardId => {
      const CardsSameId = studySet?.cards.find(cardObj => cardObj.card._id === cardId);
      return {
        answer: CardsSameId?.card?.answer || "",
        question: CardsSameId?.card?.question || "",
      };
    }),
  });
  

  //?tests to see if the cards are being pulled from the database
  console.log("studySetttttttt", studySet);
  console.log("Initial formState:", formState);
  console.log(
    "cardsDefault has Q and A in it: ",
    cardsDefault[1]?.card.question
  );
  console.log("Rendered formState:", formState);
  useEffect(() => {
    getUserInfo();
    console.log("cardsDefault in useEffect:", cardsDefault);

    if (cardsDefault.length > 0) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        cards: cardsDefault.map((eachCard) => ({
          answer: eachCard?.answer,
          question: eachCard?.question,
        })),
        
      }));
    }
  }, [id, JSON.stringify(cardsDefault)]);


  const handleCardChange = (index, field, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      cards: prevFormState.cards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      ),
    }));
  };
  
  // const handleCardChange = (index, field, value) => {
  //   const updatedCards = [...formState.cards];
  //   updatedCards[index] = {
  //     ...updatedCards[index],
  //     [field]: value,
  //   };
  //   setFormState({
  //     ...formState,
  //     cards: updatedCards,
  //   });
  // };

  const handleAddCard = () => {
    setFormState({
      ...formState,
      cards: [...formState.cards, { question: "", answer: "" }],
    });
  };

  const handleRemoveCard = (index) => {
    const updatedCards = [...formState.cards];
    updatedCards.splice(index, 1);
    setFormState({
      ...formState,
      cards: updatedCards,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editStudySet(
        id,
        studySetId,
        topicId,
        studySet?.topic,
        formState?.title,
        formState?.description,
        formState?.cards
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='flex justify-center items-center '>
      <form
        className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}
      >
        <h2 className='text-center text-lg font-bold mb-4'>Edit Study Set</h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='topic'
          >
            Topic
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='topic'
            type='text'
            placeholder='Enter topic'
            name='topic'
            value={formState.topic}
            onChange={(e) =>
              setFormState({ ...formState, topic: e.target.value })
            }
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 text-black leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Enter title'
            name='title'
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-black leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            placeholder='Enter description'
            name='description'
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          />
        </div>
        {formState?.cards &&
          formState?.cards.map((card, index) => (
            <div
              key={index}
              className='flex flex-wrap justify-between mb-4 relative'
            >
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor={`question${index}`}
                >
                  Question {index + 1}
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id={`question${index}`}
                  type='text'
                  placeholder={`Enter question ${index + 1}`}
                  name={`question${index}`}
                  value={card.question}
                  onChange={(e) =>
                    handleCardChange(index, "question", e.target.value)
                  }
                />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor={`answer${index}`}
                >
                  Answer {index + 1}
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id={`answer${index}`}
                  type='text'
                  placeholder={`Enter answer ${index + 1}`}
                  name={`answer${index}`}
                  value={card.answer}
                  onChange={(e) =>
                    handleCardChange(index, "answer", e.target.value)
                  }
                />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                {/* Add input field for image if needed */}
              </div>
              <button
                className='absolute right-0 top-0 mt-2 mr-2 text-red-600 hover:text-red-700 focus:outline-none'
                type='button'
                onClick={() => handleRemoveCard(index)}
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
