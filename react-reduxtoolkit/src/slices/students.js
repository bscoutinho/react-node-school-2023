import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataService from "../services/DataService";

const initialState = [];
const path = "students";

export const createStudent = createAsyncThunk(
  "students/create",
  async ( obj ) => {
    const res = await DataService.create(path, obj);
    return res.data;
  }
);

export const retrieveStudents = createAsyncThunk(
  "students/retrieve",
  async () => {
    const res = await DataService.getAll(path);
    return res.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ( data ) => {
    const res = await DataService.update(path, data.id, data);
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async ( id ) => {
    await DataService.remove(path, id);
    return { id };
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: {
    [createStudent.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveStudents.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateStudent.fulfilled]: (state, action) => {
      const index = state.findIndex(student => student.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteStudent.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = studentSlice;
export default reducer;