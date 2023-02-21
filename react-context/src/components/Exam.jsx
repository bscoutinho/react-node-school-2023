import React, { useState, useContext, useEffect, useCallback } from "react";
import { DataContext } from "../context/DataContext";
import Title from "../shared/Title";
import Assignment from "@mui/icons-material/Assignment";
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

const Exam = () => {
  const exDefaultValues = { id: 0, name: "", subjectId: 1 };
  const { dataExam, dataSubject, getExams, getSubjects } = useContext(DataContext);
  const [exFormValues, setExFormValues] = useState(exDefaultValues);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const path = "exams";

  const retrieveData = useCallback(() => {
    let subjectList = [];
    DataService.getAll("subjects")
      .then((response) => {
        subjectList = response.data;
        getSubjects(response.data);
      })
      .catch((e) => {
        console.log("getSubject", e);
      });
    DataService.getAll(path)
      .then((response) => {
        let exams = response.data.map((row) => {
          const subjectName = subjectList.find(
            (subject) => subject.id === row.subjectId
          ).name;
          return { ...row, subjectName };
        });
        getExams(exams);
      })
      .catch((e) => {
        console.log("getExam", e);
      });
  }, []);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExFormValues({
      ...exFormValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(editMode) {
      
      DataService.update(path, exFormValues.id, exFormValues)
      .then(() => {
        retrieveData()
        setAlert({open: true, message: 'Exam updated successfully', severity: 'success'});
      })
      .catch(e => { 
        setAlert({open: true, message: `Update error: ${e}`, severity: 'error'});
      });

    } else { 

      let examObj = {...exFormValues, id: dataExam.length + 1}

      DataService.create(path, examObj)
      .then(() => {
        retrieveData()
        setAlert({open: true, message: 'Exam created successfully', severity: 'success'});
      })
      .catch(e => { 
        setAlert({open: true, message: `Create error: ${e}`, severity: 'error'});
      });

    }
    setExFormValues(exDefaultValues);
  };

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, message: "", severity: "success" });
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

          const thisRow = dataExam.find((row) => row.id === params.id);
          setEditMode(true);
          setExFormValues(thisRow);
        };

        const deleteRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const thisRow = dataExam.find((row) => row.id === params.id);

          DataService.remove(path, thisRow.id)
          .then(() => {
            retrieveData()
            setAlert({open: true, message: 'Exam deleted successfully', severity: 'success'});
          })
          .catch(e => {
            setAlert({open: true, message: `Delete error: ${e}`, severity: 'error'});
          });
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
      <Title title="Exam Page" icon={<Assignment />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: "30px" }}
          >
            {editMode ? "Edit Exam" : "New Exam"}
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
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ marginRight: "30px", width: "400px" }}
                >
                  <TextField
                    select
                    required
                    label="Subject"
                    id="select-subject"
                    name="subjectId"
                    value={exFormValues.subjectId}
                    onChange={handleInputChange}
                  >
                    {dataSubject.map((data) => (
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
            rows={dataExam}
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

export default Exam;
