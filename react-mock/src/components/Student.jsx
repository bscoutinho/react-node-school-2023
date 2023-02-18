import { useState } from "react";
import Title from "../shared/Title";
import AccountBox from "@mui/icons-material/AccountBox";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Student = () => {

  const rows = [
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
  
  const stDefaultValues = { id: 0, firstName: "", lastName: "" };

  const [stFormValues, setStFormValues] = useState(stDefaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStFormValues({
      ...stFormValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("stFormValues", {...stFormValues, id: rows.length + 1});
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
      <Title title="Student Page" icon={<AccountBox />} />
      <div style={{ padding: "10px 5%" }}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Typography variant="h6" component="div" style={{marginBottom: '30px'}}>
            New Student
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


export default Student;