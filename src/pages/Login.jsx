import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Loader from "../components/Loader";
axios.defaults.withCredentials = true;

const Login = () => {
  const [loader, setLoader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState("signin");
  const [val, setVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `/user/isloggedin`,
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
      } catch (error) {}
    };
    getUser();
    setLoader(false);
  }, []);

  function handler(e) {
    e.preventDefault();
    async function getUser() {
      try {
        if (form === "signup") {
          const res = await axios.post(
            `/user/register`,
            val,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              // credentials: 'include',
              withCredentials: true,
            }
          );
        } else {
          const cred = { email: val.email, password: val.password };
          const res = await axios.post(
            `/user/login`,
            cred,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              // credentials: 'include',
              withCredentials: true,
            }
          );
        }
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    getUser();
  }

  return loader ? (
    <Loader />
  ) : isLoggedIn ? (
    navigate("/home")
  ) : form === "signup" ? (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="min-h-[60vh] min-w-full sm:min-w-[50%]  rounded-3xl ">
        <div className="h-[6vh] w-full grid place-items-center ">
          <p className="text-xl font-semibold uppercase font-sans text-[#484846] tracking-wide">
            Register
          </p>
        </div>
        <form className="h-[43vh] w-full ">
          <div className="w-full h-full flex flex-col justify-around items-center ">
            <div className="h-[20%] w-[60%] min-w-[90%] sm:min-w-[50%] relative">
              <FaRegUser className="absolute top-[50%] left-3 translate-y-[-50%] text-slate-900 " />
              <input
                className="h-[100%] w-[100%] pl-10 bg-transparent text-black caret-black outline-none text-xs sm:text-base rounded-3xl border-b-2 border-[#ffffffc0]  placeholder:text-[#090909] "
                type="text"
                value={val.name}
                onChange={(e) => setVal({ ...val, name: e.target.value })}
                placeholder="Name"
              />
            </div>
            <div className="h-[20%] w-[60%] min-w-[90%] sm:min-w-[50%] relative">
              <MdAlternateEmail className="absolute top-[50%] left-3 translate-y-[-50%] text-slate-900 " />
              <input
                className="h-[100%] w-[100%] pl-10 bg-transparent text-xs sm:text-base text-black caret-black outline-none rounded-3xl border-b-2 border-[#ffffffc0]  placeholder:text-[#090909] "
                type="email"
                value={val.email}
                onChange={(e) => setVal({ ...val, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="h-[20%] w-[60%] min-w-[90%] sm:min-w-[50%] relative">
              <RiLockPasswordLine className="absolute top-[50%] left-3 translate-y-[-50%] text-slate-900 " />
              <input
                className="h-[100%] w-[100%] pl-10 pr-2 bg-transparent text-xs sm:text-base text-black caret-black outline-none rounded-3xl border-b-2 border-[#ffffffc0] placeholder:text-[#0a0a0a] "
                type="password"
                value={val.password}
                onChange={(e) => setVal({ ...val, password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <button
              onClick={handler}
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Register
            </button>
          </div>
        </form>
        <div className="h-[10vh] w-full flex justify-evenly items-center text-[#beb4b4] font-semibold ">
          <span className=" w-auto text-sm  ">Already have an account?</span>
          <button
            onClick={() => setForm("signin")}
            className="h-auto text-[0.8rem] underline decoration-solid hover:text-[#e6e4e4da] "
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="min-h-[60vh] min-w-full sm:min-w-[50%]  rounded-3xl ">
        <div className="h-[6vh] w-full grid place-items-center ">
          <p className="text-xl font-semibold uppercase font-sans text-[#484846] tracking-wide">
            Login
          </p>
        </div>
        <form className="h-[43vh] w-full ">
          <div className="w-full h-full flex flex-col justify-around items-center ">
            <div className="h-[20%] w-[60%] min-w-[90%] sm:min-w-[50%] relative">
              <MdAlternateEmail className="absolute top-[50%] left-3 translate-y-[-50%] text-slate-900 " />
              <input
                className="h-[100%] w-[100%] pl-10 bg-transparent text-black text-xs sm:text-base caret-black outline-none rounded-3xl border-b-2 border-[#ffffffc0]  placeholder:text-[#090909] "
                type="email"
                value={val.email}
                onChange={(e) => setVal({ ...val, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="h-[20%] w-[60%] min-w-[90%] sm:min-w-[50%] relative">
              <RiLockPasswordLine className="absolute top-[50%] left-3 translate-y-[-50%] text-slate-900 " />
              <input
                className="h-[100%] w-[100%] pl-10 pr-2 bg-transparent text-xs sm:text-base text-black caret-black outline-none rounded-3xl border-b-2 border-[#ffffffc0] placeholder:text-[#0a0a0a] "
                type="password"
                value={val.password}
                onChange={(e) => setVal({ ...val, password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <button
              onClick={handler}
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="h-[10vh] w-full flex justify-evenly items-center text-[#beb4b4] font-semibold ">
          <span className=" w-auto text-sm  ">Don't have an account?</span>
          <button
            onClick={() => setForm("signup")}
            className="h-auto text-[0.8rem] underline decoration-solid hover:text-[#e6e4e4da] "
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
