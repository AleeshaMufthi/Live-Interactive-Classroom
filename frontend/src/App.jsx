import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./api/axios";
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import TeacherSession from "./pages/TeacherSession";
import StudentJoin from "./pages/StudentJoin";



function App() {

  

  return (
    <>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherSession />} />
        <Route path="/student" element={<StudentJoin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
