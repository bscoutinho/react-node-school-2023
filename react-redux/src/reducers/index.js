import { combineReducers } from "redux";
import students from "./students";
import subjects from "./subjects";
import exams from "./exams";
import scores from "./scores";

export default combineReducers({
    students,
    subjects,
    exams,
    scores
});