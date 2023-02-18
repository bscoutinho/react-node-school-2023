import http from "../http-common";

const getAll = () => {
  return http.get("/exams");
};

const get = id => {
  return http.get(`/exams/${id}`);
};

const create = data => {
  return http.post("/exams", data);
};

const update = (id, data) => {
  return http.put(`/exams/${id}`, data);
};

const remove = id => {
  return http.delete(`/exams/${id}`);
};

const ExamService = {
  getAll,
  create,
  update,
  remove,
  get
};

export default ExamService;
