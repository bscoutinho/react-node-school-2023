import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Student from "./components/Student"
import Subject from "./components/Subject"
import Exam from "./components/Exam"
import Score from "./components/Score"
import Header from "./shared/Header"


function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="student" element={ <Student/> } />
          <Route path="subject" element={ <Subject/> } />
          <Route path="exam" element={ <Exam/> } />
          <Route path="score" element={ <Score/> } />
      </Routes>
    </div>
  );
}

export default App;
