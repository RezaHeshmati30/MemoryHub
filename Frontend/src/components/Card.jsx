import React from "react";
import trash from "../assets/trash.png";
import { useState } from "react";
import group from "../assets/group.svg";

function Card({ removeLine }) {
  const [lines, setLines] = useState([1]);

  const addLine = () => {
    const newLines = [...lines, lines.length + 1];
    setLines(newLines);
  };

  const handleRemoveLine = (index) => {
    const newLines = lines.filter((line, i) => i !== index);
    setLines(newLines);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    setLines((prevLines) =>
      prevLines.map((line, i) =>
        i === index ? { ...line, image: URL.createObjectURL(file) } : line
      )
    );
  };

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index} className='flex flex-col card-box'>
          <div className='flex justify-between items-center pt-[24px] pb-[6px] border-b-2'>
            <p className='dm-sans-medium pl-[40px]'>{index + 1}</p>
            <img
              src={trash}
              className='pr-[40px]'
              alt='trash-icon'
              onClick={() => handleRemoveLine(index)}
            />
          </div>

          <div className='grid grid-cols-5 px-[40px] gap-9 py-[20px]'>
            <div className='border-b-2 col-span-2'>
              <textarea
                className='w-[400px] h-[100px]'
                id={`question${index}`}
                type='text'
                placeholder={`Write your Question*`}
                name={`question${index}`}
              />
            </div>
            <div className='border-b-2 col-span-2'>
              <textarea
                className='w-[400px] h-[100px]'
                id={`answer${index}`}
                type='text'
                placeholder={`Write your Answer*`}
                name={`answer${index}`}
              />
            </div>
            <div className='w-[90px] h-[64px] flex justify-center items-center outline-dashed outline-2 outline-offset-1 mx-auto my-auto'>
              {line.image ? (
                <label htmlFor={`image${index}`} className='cursor-pointer '>
                  <img
                    src={line.image}
                    alt='insert image'
                    className='object-cover'
                  />
                </label>
              ) : (
                <label htmlFor={`image${index}`} className='cursor-pointer'>
                  <img
                    src={group}
                    alt='default image'
                    className='object-cover'
                  />
                </label>
              )}
              <input
                type='file'
                accept='image/*'
                name={`image${index}`}
                onChange={(e) => handleImageChange(e, index)}
                className='hidden'
                id={`image${index}`}
              />
            </div>
          </div>
        </div>
      ))}

      <div
        className='dm-sans-medium hover:underline cursor-pointer flex justify-center py-[40px]'
        onClick={addLine}
      >
        + Add new Card
      </div>
    </div>
  );
}

export default Card;
