import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveStudents,
  updateStudent,
  createStudent,
  deleteStudent
} from "../slices/students";
import Title from "../shared/Title";
import AccountBox from "@mui/icons-material/AccountBox";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Student = () => {

  const stDefaultValues = { id: 0, firstName: "", lastName: "" };
  const [stFormValues, setStFormValues] = useState(stDefaultValues);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', severity: ''});
  const students = useSelector(state => state.students);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveStudents());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStFormValues({
      ...stFormValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(editMode) {
      
      dispatch(updateStudent(stFormValues))
        .then(() => {
          setStFormValues(stDefaultValues);
          setEditMode(false);
          setAlert({open: true, message: 'Student updated successfully', severity: 'success'});
        })
        .catch(e => {
          setAlert({open: true, message: `Update error: ${e}`, severity: 'error'});
        });

    } else { 

      let studentObj = {...stFormValues, id: students.length + 1}

      dispatch(createStudent(studentObj))
        .then(() => {
          setStFormValues(stDefaultValues);
          setAlert({open: true, message: 'Student created successfully', severity: 'success'});
        })
        .catch(e => {
          setAlert({open: true, message: `Creation error: ${e}`, severity: 'error'});
        });
    }
  };

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open: false, message: '', severity: 'success'});
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First name", width: 400 },
    { field: "lastName", headerName: "Last name", width: 400 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const editRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const thisRow = students.find((row) => row.id === params.id);
          setEditMode(true);
          setStFormValues(thisRow);
        };
  
        const deleteRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const thisRow = students.find((row) => row.id === params.id);
          dispatch(deleteStudent(thisRow.id))
          .then(() => {
            setAlert({open: true, message: 'Student deleted successfully', severity: 'success'});
          })
          .catch(e => {
            setAlert({open: true, message: `Delete error: ${e}`, severity: 'error'});
          });
        };
  
        return (
          <div>
            <IconButton
              color="primary"
              aria-label="edit student"
              component="label"
              onClick={editRow}
            >
              <Edit />
            </IconButton>
  
            <IconButton
              color="error"
              aria-label="delete student"
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={alert.severity} sx={{ width: '100%' }}>{alert.message}</Alert>
      </Snackbar>
      <Title title='Student page' icon={<AccountBox />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            {editMode ? 'Edit Student' : 'New Student'}
          </Typography>
          <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <TextField
                  required
                  id="firstName-input"
                  name="firstName"
                  label="First Name"
                  type="text"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={stFormValues.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="lastName-input"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={stFormValues.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            Student List
          </Typography>
          <DataGrid
            rows={students}
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


export default Student;