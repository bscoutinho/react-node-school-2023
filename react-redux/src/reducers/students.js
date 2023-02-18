import { 
  RETRIEVE_STUDENTS, 
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT 
} from "../actions/types";

const initialState = [];

const studentReducer = (students = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_STUDENT:
      return [...students, payload];

    case RETRIEVE_STUDENTS:
      return payload;

    case UPDATE_STUDENT:
      return students.map((tutorial) => {
        if (tutorial.id === payload.id) {
          return {
            ...tutorial,
            ...payload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_STUDENT:
      return students.filter(({ id }) => id !== payload.id);

    default:
      return students;
  }
};

export default studentReducer;
