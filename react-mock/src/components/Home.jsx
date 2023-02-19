import React from "react";
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

const data2 = [
  {
    name: "Student A",
    score: 4000,
  },
  {
    name: "Student B",
    score: 3000,
  },
  {
    name: "Student C",
    score: 2000,
  },
  {
    name: "Student D",
    score: 2780,
  },
  {
    name: "Student E",
    score: 1890,
  },
];

const data = [
  {
    name: "Divisions",
    exam: 2400,
  },
  {
    name: "Fractions",
    exam: 1398,
  },
  {
    name: "Word problems",
    exam: 9800,
  },
  {
    name: "Redwall exam",
    exam: 3908,
  },
  {
    name: "Short story",
    exam: 4800,
  },
  {
    name: "Federal elections",
    exam: 3800,
  },
];

const Home = () => {
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
              10
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
              10
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
              10
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
              10
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
              data={data}
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
              Top 5 students per sum of scores
            </Typography>
            <AreaChart
              width={700}
              height={450}
              data={data2}
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
