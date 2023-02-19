import {
    RETRIEVE_SUBJECTS,
    CREATE_SUBJECT,
    UPDATE_SUBJECT,
    DELETE_SUBJECT
  } from "./types";
  
  import DataService from "../services/DataService";

  const path = "subjects";
  
  export const retrieveSubjects = () => async (dispatch) => {
    try {
      const res = await DataService.getAll(path);
  
      dispatch({
        type: RETRIEVE_SUBJECTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(RETRIEVE_SUBJECTS, err);
    }
  };

  export const createSubject = (obj) => async (dispatch) => {
    try {
      const res = await DataService.create(path, obj);
  
      dispatch({
        type: CREATE_SUBJECT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateSubject = (data) => async (dispatch) => {
    try {
      const res = await DataService.update(path, data.id, data);
  
      dispatch({
        type: UPDATE_SUBJECT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteSubject = (id) => async (dispatch) => {
    try {
      await DataService.remove(path, id);
  
      dispatch({
        type: DELETE_SUBJECT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  