import {
    RETRIEVE_EXAMS,
    CREATE_EXAM,
    UPDATE_EXAM,
    DELETE_EXAM
  } from "./types";
  
  import ExamDataService from "../services/ExamService";
  
  export const retrieveExams = () => async (dispatch) => {
    try {
      const res = await ExamDataService.getAll();
  
      dispatch({
        type: RETRIEVE_EXAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(RETRIEVE_EXAMS, err);
    }
  };

  export const createExam = (obj) => async (dispatch) => {
    try {
      const res = await ExamDataService.create(obj);
  
      dispatch({
        type: CREATE_EXAM,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateExam = (data) => async (dispatch) => {
    try {
      const res = await ExamDataService.update(data.id, data);
  
      dispatch({
        type: UPDATE_EXAM,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteExam = (id) => async (dispatch) => {
    try {
      await ExamDataService.remove(id);
  
      dispatch({
        type: DELETE_EXAM,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  