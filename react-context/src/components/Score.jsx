import React, { useState, useContext, useEffect, useCallback } from "react";
import { DataContext } from "../context/DataContext";
import Title from "../shared/Title";
import Scoreboard from "@mui/icons-material/Scoreboard";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DataService from "../services/DataService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Score = () => {
  const scDefaultValues = { id: 0, examId: 1, studentId: 1, score: 0 };
  const { dataExam, dataStudent, dataScore, getExams, getStudents, getScores } =
    useContext(DataContext);
  const [scFormValues, setScFormValues] = useState(scDefaultValues);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const path = "scores";

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
    DataService.getAll("students")
      .then((response) => {
        studentList = response.data;
        getStudents(response.data);
      })
      .catch((e) => {
        console.log("getStudent", e);
      });
    DataService.getAll(path)
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

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScFormValues({
      ...scFormValues,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(editMode) {
      
      DataService.update(path, scFormValues.id, scFormValues)
      .then(() => {
        retrieveData()
        setAlert({open: true, message: 'Score updated successfully', severity: 'success'});
      })
      .catch(e => { 
        setAlert({open: true, message: `Update error: ${e}`, severity: 'error'});
      });

    } else { 

      let examObj = {...scFormValues, id: dataScore.length + 1}

      DataService.create(path, examObj)
      .then(() => {
        retrieveData()
        setAlert({open: true, message: 'Score created successfully', severity: 'success'});
      })
      .catch(e => { 
        setAlert({open: true, message: `Create error: ${e}`, severity: 'error'});
      });

    }
    setScFormValues(scDefaultValues);
  };

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, message: "", severity: "success" });
  };

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

          const thisRow = dataScore.find((row) => row.id === params.id);
          setEditMode(true);
          setScFormValues(thisRow);
        };

        const deleteRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const thisRow = dataScore.find((row) => row.id === params.id);

          DataService.remove(path, thisRow.id)
          .then(() => {
            retrieveData()
            setAlert({open: true, message: 'Score deleted successfully', severity: 'success'});
          })
          .catch(e => {
            setAlert({open: true, message: `Delete error: ${e}`, severity: 'error'});
          });
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

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        message={alert.message}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Title title="Score Page" icon={<Scoreboard />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: "30px" }}
          >
            {editMode ? "Edit Score" : "New Score"}
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ marginRight: "30px", width: "400px" }}
                >
                  <TextField
                    select
                    required
                    label="Student"
                    id="select-student"
                    name="studentId"
                    value={scFormValues.studentId}
                    onChange={handleInputChange}
                  >
                    {dataStudent.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.firstName + " " + data.lastName}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ marginRight: "30px", width: "400px" }}
                >
                  <TextField
                    select
                    required
                    label="Exam"
                    id="select-exam"
                    name="examId"
                    value={scFormValues.examId}
                    onChange={handleInputChange}
                  >
                    {dataExam.map((data) => (
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
            rows={dataScore}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            style={{
              height: 400,
              width: "100%",
              backgroundColor: "white",
              marginBottom: "30px",
            }}
            components={{
              Toolbar: GridToolbarFilterButton,
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Score;
