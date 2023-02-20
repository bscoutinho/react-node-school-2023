import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataService from "../services/DataService";

const initialState = [];
const path = "subjects";

export const createSubject = createAsyncThunk(
  "subjects/create",
  async ( obj ) => {
    const res = await DataService.create(path, obj);
    return res.data;
  }
);

export const retrieveSubjects = createAsyncThunk(
  "subjects/retrieve",
  async () => {
    const res = await DataService.getAll(path);
    return res.data;
  }
);

export const updateSubject = createAsyncThunk(
  "subjects/update",
  async ( data ) => {
    const res = await DataService.update(path, data.id, data);
    return res.data;
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async ( id ) => {
    await DataService.remove(path, id);
    return { id };
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  extraReducers: {
    [createSubject.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveSubjects.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateSubject.fulfilled]: (state, action) => {
      const index = state.findIndex(subject => subject.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteSubject.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = subjectSlice;
export default reducer;