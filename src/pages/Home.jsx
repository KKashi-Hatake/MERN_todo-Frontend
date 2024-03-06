import React, { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo.jsx";
import Todo from "../components/Todo.jsx";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/todo.jsx";


const Home = () => {
  const {render} = useTodo()
  const [loader, setLoader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}user/isloggedin`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            // credentials: 'include',
            withCredentials: true,
          }
        );
        setIsLoggedIn(res.data.isLoggedIn);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };
    getUser();
    setLoader(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}todo/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            // credentials: 'include',
            withCredentials: true,
          }
        );
        setData(res.data.todos);
      } catch (error) {
        alert(error);
      }
    };
    isLoggedIn && getData();
    getData();
  }, [render]);




  return loader ? (
    <Loader />
  ) : isLoggedIn ? (
    <div className="h-screen flex flex-col items-center overflow-auto">
      <CreateTodo  />
      {data.length===0?<p>No todos to show!</p>:data.map((e) => (
        <Todo key={e._id} data={e} />
      ))}
    </div>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-xl font-serif font-bold">Please Login First</p>
      <button
        onClick={() => navigate("/")}
        className="h-10 w-20 m-2 sm:ml-1 rounded-lg bg-gradient-to-r cursor-pointer from-indigo-400 to-purple-500 flex justify-center items-center"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
