import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudySetsContext } from "../context/StudySetsContext";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";
import "../components/css/form.css";
import Back from "../components/Back";
import Card from "../components/Card";
import TopicList from "../components/TopicList";

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
        let image = "";
        if (imageFile.size > 0) {
          image = await readImageAsBase64(imageFile);
        }
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
  const removeLine = (indexToRemove) => {
    const updatedLines = [...lines];
    updatedLines.splice(indexToRemove, 1);
    setLines(updatedLines);
  };
  const handleSelectTopic = (selectedTopic) => {
    setUpdatedTopicTitle(selectedTopic);
  };

  return (
    <div className='max-container padding-container regal-blue '>
      {hasToken && (
        <div>
          <Back />
          <div className='felx justify-center flex-col '>
            <form
              className='w-[1128px] mx-auto flex justify-center'
              onSubmit={handleCreateSets}
            >
              <div className='flex flex-col gap-[24px]'>
                <h2 className='dm-sans-medium text-[2em]'>Creating new set</h2>
                <div className='flex justify-between items-center mt-[64px]'>
                  <input
                    className='new-topic topic-box dm-sans-regular '
                    placeholder='Create your own topic*'
                    type='text'
                    name='topic'
                    value={updatedTopicTitle}
                    onChange={(e) => setUpdatedTopicTitle(e.target.value)}
                  />
                  <p className='or dm-sans-regular'>or</p>
                  <TopicList onSelectTopic={handleSelectTopic} />

                </div>
                <input
                  className='new-topic w-[1128px]'
                  id='title'
                  type='text'
                  placeholder='Add Title*'
                  name='title'
                />
                <textarea
                  className='description'
                  id='description'
                  placeholder='Add description*'
                  name='description'
                />
                <Card removeLine={removeLine} lines={lines} />
                <div className='flex justify-end'>
                  <button
                    className='create-btn-color create-button cursor-pointer rounded-[8px] dm-sans-bold flex '
                    type='submit'
                  >
                    create new set
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateSets;
