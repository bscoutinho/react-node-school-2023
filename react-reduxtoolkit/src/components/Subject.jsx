import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveSubjects,
  createSubject,
  deleteSubject,
  updateSubject
} from "../slices/subjects";
import Title from "../shared/Title";
import Subtitles from '@mui/icons-material/Subtitles';
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

const Subject = () => {
  const sbDefaultValues = { id: 0, name: "" };
  const [sbFormValues, setSbFormValues] = useState(sbDefaultValues);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', severity: ''});
  const subjects = useSelector(state => state.subjects);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveSubjects());
  }, [dispatch])
  
  useEffect(() => {
    initFetch()
  }, [initFetch])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSbFormValues({
      ...sbFormValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(editMode) {
      
      dispatch(updateSubject(sbFormValues))
        .then(() => {
          setSbFormValues(sbDefaultValues);
          setEditMode(false);
          setAlert({open: true, message: 'Subject updated successfully', severity: 'success'});
        })
        .catch(e => {
          setAlert({open: true, message: `Update error: ${e}`, severity: 'error'});
        });

    } else { 

      let subjectObj = {...sbFormValues, id: subjects.length + 1}

      dispatch(createSubject(subjectObj))
        .then(() => {
          setSbFormValues(sbDefaultValues);
          setAlert({open: true, message: 'Subject created successfully', severity: 'success'});
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
    { field: "name", headerName: "Subject", width: 400 },
    {
      field: "action",
      headerName: "Action",
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const editRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const thisRow = subjects.find((row) => row.id === params.id);
  
            setEditMode(true);
            setSbFormValues(thisRow);
        };
  
        const deleteRow = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const thisRow = subjects.find((row) => row.id === params.id);
  
          dispatch(deleteSubject(thisRow.id))
          .then(() => {
            setAlert({open: true, message: 'Subject deleted successfully', severity: 'success'});
          })
          .catch(e => {
            setAlert({open: true, message: `Delete error: ${e}`, severity: 'error'});
          });
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
      <Title title="Subject Page" icon={<Subtitles />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            {editMode ? 'Edit Subject' : 'New Subject'}
          </Typography>
          <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <TextField
                  required
                  id="name-input"
                  name="name"
                  label="Subject"
                  type="text"
                  style={{ marginRight: "30px", width: "400px" }}
                  value={sbFormValues.name}
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
            rows={subjects}
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



export default Subject;
