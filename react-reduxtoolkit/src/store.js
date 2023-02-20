import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/students';
import subjectReducer from './slices/subjects';
import examReducer from './slices/exams';
import scoreReducer from './slices/scores';

const reducer = {
  students: studentReducer,
  subjects: subjectReducer,
  exams: examReducer,
  scores: scoreReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;