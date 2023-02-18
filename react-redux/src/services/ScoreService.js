import http from "../http-common";

const getAll = () => {
  return http.get("/scores");
};

const get = id => {
  return http.get(`/scores/${id}`);
};

const create = data => {
  return http.post("/scores", data);
};

const update = (id, data) => {
  return http.put(`/scores/${id}`, data);
};

const remove = id => {
  return http.delete(`/scores/${id}`);
};

const ScoreService = {
  getAll,
  create,
  update,
  remove,
  get
};

export default ScoreService;
