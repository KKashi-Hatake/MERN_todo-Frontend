import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import img from "./assets/bg.jpg";
import { TodoProvider } from "./context/todo";

function App() {
  const [render, setRender] = useState(true);
  const toggleRender = () => {
    setRender(!render);
  };
  return (
    <TodoProvider value={{ render, toggleRender }}>
      <div className={`h-screen relative w-full bg-[#ffffff34] `}>
        <div className="absolute top-0 left-0 w-full h-screen object-contain -z-10 blur-[2px]">
          <img className="h-full w-full" src={img} alt="" />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </TodoProvider>
  );
}

export default App;
