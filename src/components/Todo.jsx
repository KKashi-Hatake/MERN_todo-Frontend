import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useTodo } from "../context/todo.jsx";
import axios from "axios";

const Todo = ({ data }) => {
  const [text, setText] = useState(data.content);
  const [check, setCheck] = useState(data.isComplete);
  const [edit, setEdit] = useState(false);
  const { toggleRender } = useTodo();
  const delHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `/todo/delete/${data._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // credentials: 'include',
          withCredentials: true,
        }
      );
      toggleRender();
    } catch (error) {
      alert()
    }
  };
  const checkHandler = async (e, val) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/todo/update`,
        { ...data, isComplete: val, content: text },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // credentials: 'include',
          withCredentials: true,
        }
      );
      setCheck(val);
    } catch (error) {}
  };
  const handler = async (e) => {
    setEdit((prev) => !prev);
    if (edit) {
      try {
        await axios.post(
          `/todo/update`,
          { ...data, content: text, isComplete: check },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            // credentials: 'include',
            withCredentials: true,
          }
        );
      } catch (error) {}
    }
  };

  return (
    <div className="h-[15%] sm:h-[10%]  w-screen flex text-purple-950 text-xs sm:text-base justify-center mb-2 items-center lg:w-[60%]  ">
      <div className="w-[85%] sm:w-[90%] rounded-md flex items-center relative text-black bg-gradient-to-r from-green-400 to-blue-500 py-2 ">
        <input
          type="checkbox"
          className="-mx-2 sm:h-5 sm:w-5 outline-none basis-1/5 sm:basis-1/12  "
          checked={check}
          onChange={(e) => checkHandler(e, !check)}
        />
        <input
          className={`bg-transparent h-5 sm:h-8  p-2 sm:p-3  basis-3/5 sm:basis-10/12 outline-none ${
            check ? "line-through" : ""
          }`}
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
          readOnly={!edit}
        />
        <button
          onClick={(e) => handler(e)}
          className="h-10 w-10 sm:ml-1 absolute basis-1/5  right-2 rounded-lg  cursor-pointer text-2xl flex justify-center items-center"
        >
          {!edit ? (
            <CiEdit className="text-white text-lg sm:text-2xl" />
          ) : (
            <FaRegSave className="text-white text-lg sm:text-2xl" />
          )}
        </button>
      </div>
      <button
        onClick={(e) => delHandler(e)}
        className="h-10 w-10 ml-1  rounded-lg bg-gradient-to-r cursor-pointer from-indigo-400 to-purple-500 flex justify-center items-center"
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default Todo;
