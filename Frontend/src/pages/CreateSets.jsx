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
  const { userId, getUserInfo } = useContext(AuthContext);
  const { readImageAsBase64 } = useContext(UserStudySetsContext);
  const [lines, setLines] = useState([1]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const handleCreateSets = async (e) => {
    e.preventDefault();
    try {
      console.log("User ID:", userId);
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
       
        console.log(`Card ${i + 1}:`, formObject.cards[i]);
      }

      console.log("formObject.cards", formObject.cards[0].card);

      if (formObject) {
       await createStudySetsAndCards(
          userId,
          formObject.topic,
          formObject.title,
          formObject.description,
          formObject.createdBy,
          formObject.cards
        );

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

  // const readImageAsBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = () => {
  //         resolve(reader.result);
  //       };
  //       reader.onerror = (error) => {
  //         reject(error);
  //       };
  //     } else {
  //       resolve(null);
  //     }
  //   });
  // };

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
      <form
        className='bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleCreateSets}
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
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='topic'
            type='text'
            placeholder='Enter title'
            name='topic'
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
    </div>
  );
}

export default CreateSets;