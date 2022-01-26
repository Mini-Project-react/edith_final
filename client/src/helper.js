const base_url = "http://localhost:5000/";
export function getUserRegisterApi() {
  return base_url + "api/users/register";
}
export function getUserLogin() {
  return base_url+"api/users/login";
}
export function getCurrUser(id) {
  return base_url + "api/users/" + id;
}
export function postProjectApi() {
  return base_url + "api/projects/store";
}
export function getProjectsApi() {
  return base_url + "api/projects";
}
export function postTaskApi() {
  return base_url + "api/tasks/store";
}
export function getTaskApi(id) {
  return base_url + "api/tasks/show/"+id;
}
export function postFilesApi(id) {
  return base_url + "api/tasks/upload";
}
