import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import openIcon from "../assets/open.svg";
import closeIcon from "../assets/close.svg";

function TopicList({ onSelectTopic }) {
  const { user } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const toggleList = () => {
    setOpen(!isOpen);
  };

  const handleSelectTopic = (topicTitle) => {
    onSelectTopic(topicTitle);
    setSelectedTopic(topicTitle);
    setOpen(false);
  };

  return (
    <div className="dm-sans-regular choose-topic">
      <div className="flex items-center">
        <div
          className={`dm-sans-regular w-full py-5 cursor-pointer ${
            isOpen ? "border-b border-gray-200" : ""
          }`}
          onClick={toggleList}
        >
          {selectedTopic || "Choose from already created topics"}
        </div>
        {!isOpen ? (
          <img
            src={openIcon}
            alt="click to hide options"
            onClick={toggleList}
            className="cursor-pointer mx-5"
          />
        ) : (
          <img
            src={closeIcon}
            alt="click to show options"
            onClick={toggleList}
            className="cursor-pointer mx-5"
          />
        )}
      </div>
      {isOpen && (
        <ul
          className="dm-sans-regular w-full bg-transparent relative mt-1 border border-gray-300 overflow-y-auto max-h-80 custom-scrollbar rounded-md"
        >
          {[
            ...new Set(
              user?.savedStudySets?.map((studySet) => studySet.topic?.title)
            ),
          ].map((topicTitle) => (
            <li
              key={topicTitle}
              onClick={() => handleSelectTopic(topicTitle)}
              className="cursor-pointer dm-sans-regular px-4 py-2 hover:bg-gray-100 bg-white"
            >
              {topicTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicList;
