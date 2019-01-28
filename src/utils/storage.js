/* eslint-disable */
function setLocal(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getLocal(key) {
  let value = window.localStorage.getItem(key);
  return JSON.parse(value);
}
function setSession(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}
function getSession(key) {
  let value = window.localStorage.getItem(key);
  return JSON.parse(value);
}
function clearOneLocal(key) {
  window.localStorage.removeItem(key);
}
function clearOneSession(key) {
  window.sessionStorage.removeItem(key);
}
function clearAllLocal() {
  window.localStorage.clear();
}
function clearAllSession() {
  window.sessionStorage.clear();
}
export {
  setLocal,
  getLocal,
  setSession,
  getSession,
  clearOneLocal,
  clearOneSession,
  clearAllLocal,
  clearAllSession
}
