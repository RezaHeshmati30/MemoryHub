import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";


function EditStudySet() {
  const { editStudySet, studySetId, setTitle, setDescription, setLoading } =
    useContext(StudySetsContext);
  const { userId, getUserInfo, userStudySets, setUserStudySets } =
    useContext(AuthContext);
  const [formState, setFormState] = useState({
    topic: "",
    title: "",
    description: "",
    cards: [{ question: "", answer: "" }],
  });
  const [lines, setLines] = useState([1]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getUserInfo returns a promise
        const user = await getUserInfo();  // Make sure to await the user info
  
        // Assuming userId is available in the user object
        const studySet = user.studySets.find((set) => set._id === studySetId);
  
        if (!studySet) {
          console.error("Study set not found for the given ID");
          return;
        }
  
        setFormState({
          topic: studySet.topic,
          title: studySet.title,
          description: studySet.description,
          cards: studySet.cards || [{ question: "", answer: "" }],
        });
  
      } catch (error) {
        console.error("Error fetching study set:", error);
      }
    };
  
    fetchData();
  }, [getUserInfo, studySetId]);

  
  const handleEditSets = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: e.target.title.value,
        description: e.target.description.value,
        cards: [],
      };

      for (let index = 0; index < lines.length; index++) {
        const card = {
          question: e.target[`question${index}`].value,
          answer: e.target[`answer${index}`].value,
        };
        updatedData.cards.push(card);
      }

      await editStudySet(userId, studySetId, updatedData);
      console.log("Study Set updated successfully!");
    } catch (error) {
      console.error("Error updating study set:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...formState.cards];
    updatedCards[index][field] = value;

    setFormState((prevState) => ({
      ...prevState,
      cards: updatedCards,
    }));
  };

  const addLine = () => {
    const newLines = [...lines, lines.length + 1];
    setLines(newLines);
  };

  const removeLine = (index) => {
    const updatedCards = formState.cards.filter((_, i) => i !== index);

    setFormState((prevState) => ({
      ...prevState,
      cards: updatedCards,
    }));
    setLines(lines.filter((_, i) => i !== index));
  };

  return (
    <div className='flex justify-center items-center '>
      <form
        className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleEditSets}
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
                name={`question${index}`}
                value={formState.cards[index]?.question || ""}
                onChange={(e) =>
                  handleInputChange(index, "question", e.target.value)
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
                value={formState.cards[index]?.answer || ""}
                onChange={(e) =>
                  handleInputChange(index, "answer", e.target.value)
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
            Save Set
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudySet;
