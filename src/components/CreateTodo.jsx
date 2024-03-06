import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useTodo } from "../context/todo";


const CreateTodo = () => {
  const {render, toggleRender} = useTodo();
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const handler = async (e) => {
    e.preventDefault();
    await axios.post(
      `/todo/create`,
      {content:inputText},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // credentials: 'include',
        withCredentials: true,
      }
    )
    setInputText('')
    toggleRender(!render)
  };
  const logoutHandler = async (e)=>{
    e.preventDefault();
    await axios.get(
      `/user/logout`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        // credentials: 'include',
        withCredentials: true,
      }
    )
    navigate('/')
  }

  return (
    <div className="h-[28vh] w-screen flex text-purple-950 text-xs sm:text-base flex-col sm:flex-row justify-center items-center lg:w-[60%] ">
      <input
        type="text"
        className="w-[90%] h-10 mx-2 outline-none rounded-md bg-gradient-to-r from-green-400 to-blue-500 p-2 "
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your tasks"
      />
      <button
        onClick={handler}
        className="h-10 w-20 m-2 sm:ml-1 rounded-lg bg-gradient-to-r cursor-pointer from-indigo-400 to-purple-500 flex justify-center items-center"
      >
        <FaCheck className="text-white" />
      </button>
      <button
        onClick={logoutHandler}
        className="h-10 w-20 m-2 sm:ml-1 rounded-lg bg-gradient-to-r cursor-pointer from-indigo-400 to-purple-500 flex justify-center items-center"
      >Logout</button>
    </div>
  );
};

export default CreateTodo;
