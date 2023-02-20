import http from "../http-common";

const getAll = (path) => {
  return http.get(`/${path}`);
};

const get = (path, id) => {
  return http.get(`/${path}/${id}`);
};

const create = (path, data) => {
  return http.post(`/${path}`, data);
};

const update = (path, id, data) => {
  return http.put(`/${path}/${id}`, data);
};

const remove = (path, id) => {
  return http.delete(`/${path}/${id}`);
};

const DataService = {
  getAll,
  create,
  update,
  remove,
  get
};

export default DataService;
