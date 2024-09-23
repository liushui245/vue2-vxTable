import Cookies from "js-cookie";

const TokenKey = "satoken";

export function getToken() {
  return Cookies.get(TokenKey);
}
export function getStorage() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function setStorage(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function removeStorage() {
  return sessionStorage.removeItem(TokenKey);
}
