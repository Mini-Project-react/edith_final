import store from "./features/store";
import { fetchDataFromApi } from "./fetchData";
import { getCurrUser, getProjectsApi } from "./helper";
import { login } from "./features/userReducer";
import { InitialLizeStore } from "./features/projectReducer";
export async function updateCurUserDetails(id, projects) {
  console.log("updating the user");
  fetchDataFromApi(getCurrUser(id)).then(([data, err]) => {
    if (!err) {
      store.dispatch(login(data));
      updateCurUserProjects(projects);
    }
  });
}
export async function updateCurUserProjects(userProjects) {
  console.log("updating the user projects", userProjects);
  const [data, err] = await fetchDataFromApi(getProjectsApi());
  store.dispatch(
    InitialLizeStore(
      data.response.filter((project) => userProjects.includes(project._id))
    )
  );
}
