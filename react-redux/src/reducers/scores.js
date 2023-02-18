import { 
    RETRIEVE_SCORES, 
    CREATE_SCORE,
    UPDATE_SCORE,
    DELETE_SCORE
  } from "../actions/types";
  
  const initialState = [];
  
  const scoreReducer = (scores = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SCORE:
        return [...scores, payload];
  
      case RETRIEVE_SCORES:
        return payload;
  
      case UPDATE_SCORE:
        return scores.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_SCORE:
        return scores.filter(({ id }) => id !== payload.id);
  
      default:
        return scores;
    }
  };
  
  export default scoreReducer;
  