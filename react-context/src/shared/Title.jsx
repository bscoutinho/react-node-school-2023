import React from 'react'
import "./Title.css";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const Title = ({ title, icon }) => {
  return (
    <div className="mainTitle">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="icon"
        >
          {icon}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </div>
  )
}

export default Title