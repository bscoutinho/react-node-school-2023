import { 
    RETRIEVE_SUBJECTS, 
    CREATE_SUBJECT,
    UPDATE_SUBJECT,
    DELETE_SUBJECT
  } from "../actions/types";
  
  const initialState = [];
  
  const studentReducer = (subjects = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SUBJECT:
        return [...subjects, payload];
  
      case RETRIEVE_SUBJECTS:
        return payload;
  
      case UPDATE_SUBJECT:
        return subjects.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_SUBJECT:
        return subjects.filter(({ id }) => id !== payload.id);
  
      default:
        return subjects;
    }
  };
  
  export default studentReducer;
  