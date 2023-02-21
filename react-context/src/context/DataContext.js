import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataStudent, setDataStudent] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataExam, setDataExam] = useState([]);
  const [dataScore, setDataScore] = useState([]);
  

  const getStudents = (data) => {
    setDataStudent(data)
  }

  const getSubjects = (data) => {
    setDataSubject(data)
  }

  const getExams = (data) => {
    setDataExam(data)
  }

  const getScores = (data) => {
    setDataScore(data)
  }

  return (
    <DataContext.Provider value={{ dataStudent, dataSubject, dataExam, dataScore, getStudents, getSubjects, getExams, getScores }}>
      {children}
    </DataContext.Provider>
  );
};