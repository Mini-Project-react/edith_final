import axios from "axios";
export async function fetchDataFromApi(url) {
  try {
    const res = await axios.get(url);
    if (!res.error) return [res.data, null];
  } catch (e) {
    console.log(e);
    return [null, "something went wrong server error"];
  }
}
