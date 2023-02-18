import { useState } from "react";
import Title from "../shared/Title";
import Subtitles from '@mui/icons-material/Subtitles';
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Subject = () => {
  const sbDefaultValues = { id: 0, subject: "" };

  const [sbFormValues, setSbFormValues] = useState(sbDefaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSbFormValues({
      ...sbFormValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("sbFormValues", {...sbFormValues, id: rows.length + 1});
  };

  return (
    <div>
      <Title title="Subject Page" icon={<Subtitles />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            New Subject
          </Typography>
          <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <TextField
                  required
                  id="name-input"
                  name="subject"
                  label="Subject"
                  type="text"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={sbFormValues.subject}
                  onChange={handleInputChange}
                />
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            Subject List
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            style={{
              height: 400,
              width: "100%",
              backgroundColor: "white",
              marginBottom: "30px",
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

const rows = [
    {
      "id": 1,
      "subject": "math"
    },
    {
      "id": 2,
      "subject": "reading"
    },
    {
      "id": 3,
      "subject": "english"
    },
    {
      "id": 4,
      "subject": "science"
    },
    {
      "id": 5,
      "subject": "social studies"
    }
  ];

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "subject", headerName: "Subject", width: 400 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const editRow = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const thisRow = rows.find((row) => row.id === params.id);

        return alert(JSON.stringify(thisRow, null, 4));
      };

      const deleteRow = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const thisRow = rows.find((row) => row.id === params.id);

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (
        <div>
          <IconButton
            color="primary"
            aria-label="edit subject"
            component="label"
            onClick={editRow}
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            aria-label="delete subject"
            component="label"
            onClick={deleteRow}
          >
            <Delete />
          </IconButton>
        </div>
      );
    },
  },
];

export default Subject;
