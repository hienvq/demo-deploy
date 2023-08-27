import axiosClient from "./Api";

const getAll = (config) => {
  return axiosClient.get("/products", config);
};
const getById = (id, config) => {
  return axiosClient.get(`/products/${id}`, config);
};
const create = (data, config) => {
  return axiosClient.post("/products", data, config);
};
const update = (id, data, config) => {
  return axiosClient.put(`/products/${id}`, data, config);
};
const remove = (id, config) => {
  return axiosClient.delete(`/products/${id}`, config);
};
const getPaging = (limit, page, ...rest) => {
  const restObject = Object.assign({}, ...rest);
  console.log("HienVQ ~  rest:", rest, restObject);

  return axiosClient.get("/products", {
    params: {
      _limit: limit,
      _page: page,
      ...restObject,
    },
  });
};
const ProductApi = { getAll, create, update, remove, getById, getPaging };
export default ProductApi;
