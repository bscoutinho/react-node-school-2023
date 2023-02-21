import React, { useMemo, useEffect, useContext, useCallback } from "react";
import { DataContext } from "../context/DataContext";
import DataService from "../services/DataService";
import "./Home.css";
import Title from "../shared/Title";
import OtherHouses from "@mui/icons-material/OtherHouses";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import AccountBox from "@mui/icons-material/AccountBox";
import Assignment from "@mui/icons-material/Assignment";
import Scoreboard from "@mui/icons-material/Scoreboard";
import Subtitles from "@mui/icons-material/Subtitles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const getDataChartExam = (scores) => {
  // create an array to store the sum scores per exam
  const scoreExam = [];
  scores.forEach((row) => {
    // get the exam name
    const examName = row.examName;
    // get the score
    const score = row.score;
    // check if the exam name is already in the sumScoresPerExam array
    const exam = scoreExam.find((exam) => exam.name === examName);
    // if the exam name is already in the sumScoresPerExam array
    if (exam) {
      // add the score to the exam
      exam.exam += score;
    } else {
      // create a new exam object and add it to the sumScoresPerExam array
      scoreExam.push({ name: examName, exam: score });
    }
  });

  return scoreExam;
};

const getDataChartStudent = (scores) => {
  const scoreStudent = [];
  scores.forEach((row) => {
    const studentName = row.studentName;
    const score = row.score;
    const student = scoreStudent.find(
      (student) => student.name === studentName
    );
    if (student) {
      student.score += score;
    } else {
      scoreStudent.push({ name: studentName, score: score });
    }
  });
  scoreStudent.sort((a, b) => b.score - a.score);
  return scoreStudent;
};

const Home = () => {
  const { 
    dataExam, 
    dataStudent, 
    dataSubject, 
    dataScore,
    getExams,
    getStudents,
    getScores,
    getSubjects  } = useContext(DataContext);

  const retrieveData = useCallback(() => {
    let examList = [];
    let studentList = [];
    DataService.getAll("exams")
      .then((response) => {
        examList = response.data;
        getExams(response.data);
      })
      .catch((e) => {
        console.log("getExam", e);
      });
    DataService.getAll("subjects")
      .then((response) => {
        getSubjects(response.data);
      })
      .catch((e) => {
        console.log("getExam", e);
    });
    DataService.getAll("students")
      .then((response) => {
        studentList = response.data;
        getStudents(response.data);
      })
      .catch((e) => {
        console.log("getStudent", e);
      });
    DataService.getAll('scores')
      .then((response) => {
        let scores = response.data.map((row) => {
          const examName = examList.find((exam) => exam.id === row.examId).name;
          const student = studentList.find((student) => student.id === row.studentId);
          return {
            ...row,
            examName,
            studentName: `${student.firstName} ${student.lastName}`,
          };
        });
        getScores(scores);
      })
      .catch((e) => {
        console.log("getScore", e);
      });
  }, []);

  const dataChart1 = useMemo(() => getDataChartExam(dataScore), [dataScore]);
  const dataChart2 = useMemo(() => getDataChartStudent(dataScore), [dataScore]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <div>
      <Title title="Home page" icon={<OtherHouses />} />
      <div className="mainContainer">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: 10,
            "& > :not(style)": {
              m: 1,
              width: 256,
              height: 128,
            },
            justifyContent: "space-evenly",
          }}
        >
          <Card className="widgetContainer">
            <div className="widgetTitle">
              <AccountBox style={{ marginRight: 10 }} />
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                Students
              </Typography>
            </div>
            <Typography
              style={{ fontSize: 50, fontWeight: "bold", color: "white" }}
            >
              {dataStudent.length}
            </Typography>
          </Card>
          <Card className="widgetContainer">
            <div className="widgetTitle">
              <Subtitles style={{ marginRight: 10 }} />
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                Subjects
              </Typography>
            </div>
            <Typography
              style={{ fontSize: 50, fontWeight: "bold", color: "white" }}
            >
              {dataSubject.length}
            </Typography>
          </Card>
          <Card className="widgetContainer">
            <div className="widgetTitle">
              <Assignment style={{ marginRight: 10 }} />
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                Exams
              </Typography>
            </div>
            <Typography
              style={{ fontSize: 50, fontWeight: "bold", color: "white" }}
            >
              {dataExam.length}
            </Typography>
          </Card>
          <Card className="widgetContainer">
            <div className="widgetTitle">
              <Scoreboard style={{ marginRight: 10 }} />
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                Scores
              </Typography>
            </div>
            <Typography
              style={{ fontSize: 50, fontWeight: "bold", color: "white" }}
            >
              {dataScore.length}
            </Typography>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",

            "& > :not(style)": {
              m: 1,
              width: 700,
              height: 512,
            },
            justifyContent: "space-evenly",
          }}
        >
          <Card className="chartContainer">
            <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
              Sum scores per exam
            </Typography>
            <BarChart
              width={700}
              height={450}
              data={dataChart1}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="exam" fill="#1976d2" />
            </BarChart>
          </Card>
          <Card className="chartContainer">
            <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
              Students per sum of scores
            </Typography>
            <AreaChart
              width={700}
              height={450}
              data={dataChart2}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#8884d8"
                fill="#1976d2"
              />
            </AreaChart>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default Home;
