import request from "@/config/request";
const url = import.meta.env.VITE_BASE_URL;

export const getTest = (params: object) => {
  return request({
    url: `${url}/test`,
    method: "GET",
    params
  });
};


export const postTest = (data: object) => {
  return request({
    url: `${url}test`,
    method: "POST",
    data,
  });
};

export const putTest = (data: object) => {
  return request({
    url: `${url}/test`,
    method: "PUT",
    data,
  });
};
