import { useState } from "react";

import Title from "../shared/Title";
import Assignment from "@mui/icons-material/Assignment";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Exam = () => {

  const rows = [
    { id: 1, name: "division", subjectId: 1 },
    { id: 2, name: "fractions", subjectId: 1 },
    { id: 3, name: "word problems", subjectId: 1 },
    { id: 4, name: "time for andrew exam", subjectId: 2 },
    { id: 5, name: "redwall exam", subjectId: 2 },
    { id: 6, name: "parts of speech", subjectId: 3 },
    { id: 7, name: "short story", subjectId: 3 },
    { id: 8, name: "the scientific method", subjectId: 4 },
    { id: 9, name: "branches of federal government", subjectId: 5 },
    { id: 10, name: "federal elections", subjectId: 5 },
  ];
  
  const rowSubjects = [
    { id: 1, name: "math" },
    { id: 2, name: "reading" },
    { id: 3, name: "english" },
    { id: 4, name: "science" },
    { id: 5, name: "social studies" },
  ];

  const data = rows.map((row) => {
    const subjectName = rowSubjects.find((subject) => subject.id === row.subjectId).name;
    return {...row, subjectName};
  });

  const exDefaultValues = { id: 0, name: "", subjectId: 1 };

  const [exFormValues, setExFormValues] = useState(exDefaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExFormValues({
      ...exFormValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("exFormValues", { ...exFormValues, id: rows.length + 1 });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Exam Name", width: 400 },
    { field: "subjectName", headerName: "Subject", width: 400 },
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
              aria-label="edit exam"
              component="label"
              onClick={editRow}
            >
              <Edit />
            </IconButton>
  
            <IconButton
              color="error"
              aria-label="delete exam"
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

  return (
    <div>
      <Title title="Exam Page" icon={<Assignment />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: "30px" }}
          >
            New Exam
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <TextField
                  id="name-input"
                  name="name"
                  label="Name"
                  type="text"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={exFormValues.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginRight: "30px", width: "400px" }}>
                  <TextField
                    select
                    required
                    label="Subject"
                    id="select-subject"
                    name="subjectId"
                    value={exFormValues.subjectId}
                    onChange={handleInputChange}
                  >
                    {rowSubjects.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: "30px" }}
          >
            Exam List
          </Typography>
          <DataGrid
            rows={data}
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


export default Exam;
