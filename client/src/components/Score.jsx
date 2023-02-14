import { useState } from "react";
import Title from "../shared/Title";
import Scoreboard from "@mui/icons-material/Scoreboard";
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

const Score = () => {
  const rows = [
    { id: 1, examId: 1, studentId: 1, score: 97 },
    { id: 2, examId: 1, studentId: 2, score: 86 },
    { id: 3, examId: 1, studentId: 3, score: 85 },
    { id: 4, examId: 2, studentId: 1, score: 65 },
    { id: 5, examId: 2, studentId: 2, score: 78 },
    { id: 6, examId: 2, studentId: 3, score: 72 },
    { id: 7, examId: 3, studentId: 1, score: 82 },
    { id: 8, examId: 3, studentId: 2, score: 80 },
    { id: 9, examId: 3, studentId: 3, score: 97 },
    { id: 10, examId: 4, studentId: 1, score: 87 },
  ];

  const rowExams = [
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

  const rowStudents = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const data = rows.map((row) => {
    const exam = rowExams.find((exam) => exam.id === row.examId);
    const student = rowStudents.find((student) => student.id === row.studentId); 
    return {
      ...row, 
      examName: exam.name,
      studentName: `${student.firstName} ${student.lastName}`
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "examName", headerName: "Exam Name", width: 400 },
    { field: "studentName", headerName: "Student", width: 400 },
    { field: "score", headerName: "Score", width: 400 },
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
              aria-label="edit score"
              component="label"
              onClick={editRow}
            >
              <Edit />
            </IconButton>

            <IconButton
              color="error"
              aria-label="delete score"
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

  const scDefaultValues = { id: 0, examId: 1, studentId: 1, score: 0 };

  const [scFormValues, setExFormValues] = useState(scDefaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExFormValues({
      ...scFormValues,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("scFormValues", { ...scFormValues, id: rows.length + 1 });
  };

  return (
    <div>
      <Title title="Score Page" icon={<Scoreboard />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: "30px" }}
          >
            New Score
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginRight: "30px", width: "400px" }}>
                  <TextField
                    select
                    required
                    label="Student"
                    id="select-student"
                    name="studentId"
                    value={scFormValues.studentId}
                    onChange={handleInputChange}
                  >
                    {rowStudents.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.firstName + " " + data.lastName}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ marginRight: "30px", width: "400px" }}>
                  <TextField
                    select
                    required
                    label="Exam"
                    id="select-exam"
                    name="examId"
                    value={scFormValues.examId}
                    onChange={handleInputChange}
                  >
                    {rowExams.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  id="score-input"
                  name="score"
                  label="Score"
                  type="number"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={scFormValues.score}
                  min={0}
                  max={100}
                  onChange={handleInputChange}
                  required
                />
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
            Score List
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

export default Score;
