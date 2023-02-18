import { 
    RETRIEVE_EXAMS, 
    CREATE_EXAM,
    UPDATE_EXAM,
    DELETE_EXAM 
  } from "../actions/types";
  
  const initialState = [];
  
  const examReducer = (exams = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_EXAM:
        return [...exams, payload];
  
      case RETRIEVE_EXAMS:
        return payload;
  
      case UPDATE_EXAM:
        return exams.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_EXAM:
        return exams.filter(({ id }) => id !== payload.id);
  
      default:
        return exams;
    }
  };
  
  export default examReducer;
  