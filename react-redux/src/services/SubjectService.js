import http from "../http-common";

const getAll = () => {
  return http.get("/subjects");
};

const get = id => {
  return http.get(`/subjects/${id}`);
};

const create = data => {
  return http.post("/subjects", data);
};

const update = (id, data) => {
  return http.put(`/subjects/${id}`, data);
};

const remove = id => {
  return http.delete(`/subjects/${id}`);
};

const SubjectService = {
  getAll,
  create,
  update,
  remove,
  get
};

export default SubjectService;
