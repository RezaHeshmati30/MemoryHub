import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";

function CreateSets() {
  const {
    createStudySetsAndCards,
    answer,
    setAnswer,
    image,
    setImage,
    question,
    setQuestion,
    setTitle,
    setDescription,
  } = useContext(StudySetsContext);
  const [updatedTopicTitle, setUpdatedTopicTitle] = useState("");
  const { user, userId, getUserInfo, hasToken } = useContext(AuthContext);
  const { readImageAsBase64 } = useContext(UserStudySetsContext);
  const [lines, setLines] = useState([1]);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      getUserInfo();
    } else {
      navigate("/");
    }
  }, [userId]);

  const handleCreateSets = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const formObject = {
        topic: formData.get("topic"),
        title: formData.get("title"),
        description: formData.get("description"),
        createdBy: userId,
        cards: [],
      };

      for (let i = 0; i < lines.length; i++) {
        const question = formData.get(`question${i}`);
        const answer = formData.get(`answer${i}`);
        const imageFile = formData.get(`image${i}`);

        const image = await readImageAsBase64(imageFile);
        formObject.cards.push({
          question,
          answer,
          image,
        });
      }

      if (formObject) {
        await createStudySetsAndCards(
          userId,
          //formObject.topic,
          updatedTopicTitle,
          formObject.title,
          formObject.description,
          formObject.createdBy,
          formObject.cards
        );

        alert("Study sets and cards created successfully!");
        console.log("Study sets and cards created successfully!", formObject);

        setQuestion([""]);
        setAnswer([""]);
        setImage([""]);
        setTitle("");
        setDescription("");
        navigate(`/user/${userId}/studySets`);
      } else {
        console.error("formObject is not defined.");
      }
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
    }
  };

  const addLine = () => {
    const newLines = [...lines, lines.length + 1];
    setLines(newLines);
  };

  const removeLine = (index) => {
    const newLines = lines.filter((line, i) => i !== index);
    setLines(newLines);
  };

  return (
    <div className='flex justify-center items-center '>
      {hasToken && (
        <form
          className='bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleCreateSets}
        >
          <div
            onClick={() => navigate("/user/:id/studySets")}
            className='flex w-[88px] h-[48px] justify-center items-center gap-[8px] cursor-pointer'
          >
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M29.6598 24.8333H20.3515L24.4182 28.8999C24.7432 29.2249 24.7432 29.7583 24.4182 30.0833C24.0932 30.4083 23.5682 30.4083 23.2432 30.0833L17.7515 24.5916C17.4265 24.2666 17.4265 23.7416 17.7515 23.4166L23.2348 17.9166C23.3905 17.7605 23.6019 17.6729 23.8223 17.6729C24.0428 17.6729 24.2541 17.7605 24.4098 17.9166C24.7348 18.2416 24.7348 18.7666 24.4098 19.0916L20.3515 23.1666H29.6598C30.1182 23.1666 30.4932 23.5416 30.4932 23.9999C30.4932 24.4583 30.1182 24.8333 29.6598 24.8333Z'
                fill='black'
              />
            </svg>
            <p className='flex dm-sans-bold text-[12px] leading-100 uppercase'>
              back
            </p>
          </div>
          <h2 className='dm-sans-medium text-[20px] leading-150'>Create a New Study Set</h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='topic'
            >
              Topic
              <input
                type='text'
                name='topic'
                value={updatedTopicTitle}
                onChange={(e) => setUpdatedTopicTitle(e.target.value)}
              />
            </label>
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='topicDropdown'
            >
              Select Topic
              <select
                id='topicDropdown'
                name='topicDropdown'
                onChange={(e) => setUpdatedTopicTitle(e.target.value)}
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
              className='shadow border rounded w-full py-2 px-3 text-gray-700 text-black leading-tight focus:outline-none focus:shadow-outline'
              id='title'
              type='text'
              placeholder='Enter title'
              name='title'
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
            />
          </div>

          {lines.map((line, index) => (
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
                  name={`question${index}`} // Unique name for each question input
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
                />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 mb-4 px-2'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor={`image${index}`}
                >
                  Image {index + 1}
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id={`image${index}`}
                  type='file'
                  accept='image/*'
                  name={`image${index}`}
                />
              </div>
              <button
                className='absolute right-0 top-0 mt-2 mr-2 text-red-600 hover:text-red-700 focus:outline-none'
                type='button'
                onClick={() => removeLine(index)}
              >
                X
              </button>
            </div>
          ))}

          <div className='flex justify-between'>
            <button
              className='bg-blue-900 hover:shadow-md cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={addLine}
            >
              Add new Card
            </button>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Create new Set
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateSets;
