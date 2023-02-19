import {
  RETRIEVE_STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "./types";

import DataService from "../services/DataService";

const path = "students";

export const retrieveStudents = () => async (dispatch) => {
  try {
    const res = await DataService.getAll(path);

    dispatch({
      type: RETRIEVE_STUDENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(RETRIEVE_STUDENTS, err);
  }
};

export const createStudent = (obj) => async (dispatch) => {
  try {
    const res = await DataService.create(path, obj);

    dispatch({
      type: CREATE_STUDENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateStudent = (data) => async (dispatch) => {
  try {
    const res = await DataService.update(path, data.id, data);

    dispatch({
      type: UPDATE_STUDENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await DataService.remove(path, id);

    dispatch({
      type: DELETE_STUDENT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
