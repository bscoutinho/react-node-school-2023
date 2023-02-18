import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Home from '@mui/icons-material/Home';
import AccountBox from '@mui/icons-material/AccountBox';
import Subtitles from '@mui/icons-material/Subtitles';
import Assignment from '@mui/icons-material/Assignment';
import Scoreboard from '@mui/icons-material/Scoreboard';


const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              School Project
            </Typography>
            <Button href="/" color="inherit" startIcon={<Home />} style={{ marginRight: '20px' }}>
              Home
            </Button>
            <Button href="student" color="inherit" startIcon={<AccountBox />} style={{ marginRight: '20px' }}>
              Students
            </Button>
            <Button href="subject" color="inherit" startIcon={<Subtitles />} style={{ marginRight: '20px' }}>
              Subjects
            </Button>
            <Button href="exam" color="inherit" startIcon={<Assignment />} style={{ marginRight: '20px' }}>
              Exams
            </Button>
            <Button href="score" color="inherit" startIcon={<Scoreboard />} style={{ marginRight: '20px' }}>
              Scores
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header