import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataService from "../services/DataService";

const initialState = [];
const path = "exams";

export const createExam = createAsyncThunk(
  "exams/create",
  async ( obj ) => {
    const res = await DataService.create(path, obj);
    return res.data;
  }
);

export const retrieveExams = createAsyncThunk(
  "exams/retrieve",
  async () => {
    const res = await DataService.getAll(path);
    return res.data;
  }
);

export const updateExam = createAsyncThunk(
  "exams/update",
  async ( data ) => {
    const res = await DataService.update(path, data.id, data);
    return res.data;
  }
);

export const deleteExam = createAsyncThunk(
  "exams/delete",
  async ( id ) => {
    await DataService.remove(path, id);
    return { id };
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState,
  extraReducers: {
    [createExam.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveExams.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateExam.fulfilled]: (state, action) => {
      const index = state.findIndex(exam => exam.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteExam.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = examSlice;
export default reducer;