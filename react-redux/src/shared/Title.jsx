import React from 'react'
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const Title = ({ title, icon }) => {
  return (
    <div style={{ padding: "20px 5%", display: "flex", alignItems: "center" }}>
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