import axios from "axios";
import { BASE_URL } from "../serverDetails";
export async function getBooks(uid) {
  try {
    const url = `${BASE_URL}/shelf/${uid}`;
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function addBook(data) {
  try {
    const url = `${BASE_URL}/shelf/addbook`;
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
export async function deleteBook(sid) {
  try {
    const url = `${BASE_URL}/shelf/deleteShelf/${sid}`;
    return await axios.delete(url);
  } catch (e) {
    return e;
  }
}
export async function changeBookStatus(sid, status) {
  console.log("Services", status, sid);
  try {
    const url = `${BASE_URL}/shelf/changeStatus/${sid}`;
    return await axios.post(url, status);
  } catch (e) {
    return e;
  }
}
export async function updateShelf(sid, data) {
  console.log("Services", status, sid);
  try {
    const url = `${BASE_URL}/shelf/update/${sid}`;
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
