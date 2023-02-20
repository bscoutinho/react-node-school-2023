import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataService from "../services/DataService";

const initialState = [];
const path = "scores";

export const createScore = createAsyncThunk(
  "scores/create",
  async ( obj ) => {
    const res = await DataService.create(path, obj);
    return res.data;
  }
);

export const retrieveScores = createAsyncThunk(
  "scores/retrieve",
  async () => {
    const res = await DataService.getAll(path);
    return res.data;
  }
);

export const updateScore = createAsyncThunk(
  "scores/update",
  async ( data ) => {
    const res = await DataService.update(path, data.id, data);
    return res.data;
  }
);

export const deleteScore = createAsyncThunk(
  "scores/delete",
  async ( id ) => {
    await DataService.remove(path, id);
    return { id };
  }
);

const scoreSlice = createSlice({
  name: "score",
  initialState,
  extraReducers: {
    [createScore.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveScores.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateScore.fulfilled]: (state, action) => {
      const index = state.findIndex(score => score.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteScore.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = scoreSlice;
export default reducer;