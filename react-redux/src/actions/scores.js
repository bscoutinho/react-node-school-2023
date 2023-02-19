import {
    RETRIEVE_SCORES,
    CREATE_SCORE,
    UPDATE_SCORE,
    DELETE_SCORE
  } from "./types";
  
  import DataService from "../services/DataService";

  const path = "scores";
  
  export const retrieveScores = () => async (dispatch) => {
    try {
      const res = await DataService.getAll(path);
  
      dispatch({
        type: RETRIEVE_SCORES,
        payload: res.data,
      });
    } catch (err) {
      console.log(RETRIEVE_SCORES, err);
    }
  };

  export const createScore = (obj) => async (dispatch) => {
    try {
      const res = await DataService.create(path, obj);
  
      dispatch({
        type: CREATE_SCORE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateScore = (data) => async (dispatch) => {
    try {
      const res = await DataService.update(path, data.id, data);
  
      dispatch({
        type: UPDATE_SCORE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteScore = (id) => async (dispatch) => {
    try {
      await DataService.remove(path, id);
  
      dispatch({
        type: DELETE_SCORE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  