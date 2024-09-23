import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/v1/sysUserApi/phone/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: {
      token,
    },
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
export function importImages(data) {
  return request({
    url: "/v1/file/upload",
    method: "post",
    data,
  });
}
export function getList(data) {
  return request({
    url: "/v1/sourceApi/list",
    method: "post",
    data,
  });
}
export function getDelete(data) {
  return request({
    url: "/v1/sourceApi/delete",
    method: "DELETE",
    data,
  });
}
export function getById(params) {
  return request({
    url: "/v1/sourceApi/getById",
    method: "GET",
    params,
  });
}
export function getRandList(params) {
  return request({
    url: "/v1/sourceApi/getRandList",
    method: "GET",
    params,
  });
}
export function addSave(data) {
  return request({
    url: "/v1/sourceApi/save",
    method: "post",
    data,
  });
}
export function updateById(data) {
  return request({
    url: "/v1/sourceApi/updateById",
    method: "put",
    data,
  });
}
export function videoCommitRecordApiList(data) {
  return request({
    url: "/v1/videoCommitRecordApi/list",
    method: "post",
    data,
  });
}
export function videoCommitRecordApiSave(data) {
  return request({
    url: "/v1/videoCommitRecordApi/save",
    method: "post",
    data,
  });
}
export function getvideoCommitRecordApi(data) {
  return request({
    url: "/v1/videoCommitRecordApi/list",
    method: "post",
    data,
  });
}
