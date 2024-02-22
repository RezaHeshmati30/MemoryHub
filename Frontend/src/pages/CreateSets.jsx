import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";


function CreateSets() {
  const {
    createStudySetsAndCards,
    answer,
    moduleData,
    setAnswer,
    image,
    setImage,
    question,
    setQuestion,
    title,
    setTitle,
    topic,
    setTopic,
    description,
    setDescription,
  } = useContext(StudySetsContext);
  const { userId, hasToken, getUserInfo } = useContext(AuthContext);
  const [lines, setLines] = useState([1]);

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const handleCreateSets = async (e) => {
    e.preventDefault();
    try {
      console.log("User ID:", userId);
      await createStudySetsAndCards(
        userId,
        title,
        description,
        question,
        answer
      );
      console.log("Study sets and cards created successfully!");
    } catch (error) {
      console.error("Error creating study sets and cards:", error);
    }
    setQuestion([""]);
    setAnswer([""]);
    setImage([""]);
    setTitle("");
    setTopic("");
    setDescription("");
  };

  const addLine = () => {
    const newLines = [...lines, lines.length + 1];
    setLines(newLines);
  };

  const removeLine = (index) => {
    const newLines = lines.filter((line, i) => i !== index);
    setLines(newLines);
  };
  const handleQuestionChange = (index, e) => {
    const newQuestions = [...question];
    newQuestions[index] = e.target.value;
    setQuestion(newQuestions);
  };

  const handleAnswerChange = (index, e) => {
    const newAnswers = [...answer];
    newAnswers[index] = e.target.value;
    setAnswer(newAnswers);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...image];
    newImages[index] = value;
    setImage(newImages);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        className='bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={(e) => handleCreateSets(e)}
      >
        <h2 className='text-center text-lg font-bold mb-4'>
          Create a New Study Set
        </h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='topic'
          >
            Topic
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='topic'
            type='text'
            placeholder='Enter topic'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                value={question[index] || ""}
                onChange={(e) => handleQuestionChange(index, e)}
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
                value={answer[index] || ""}
                onChange={(e) => handleAnswerChange(index, e)}
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
                onChange={(e) => handleImageChange(index, e.target.files[0])}
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
            Add Line
          </button>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Create new Set
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateSets;
