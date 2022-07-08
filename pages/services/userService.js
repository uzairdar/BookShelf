import axios from "axios";
import { BASE_URL } from "../serverDetails";

export async function registerRequest(user) {
  console.log("user", user);
  try {
    const url = `${BASE_URL}/user/createaccount`;
    return await axios.post(url, user);
  } catch (e) {
    return e;
  }
}
export async function loginRequest(user) {
  try {
    const url = `${BASE_URL}/user/login`;
    return await axios.post(url, user);
  } catch (e) {
    return e;
  }
}
