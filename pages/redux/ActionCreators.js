import { BOOK_DATA, LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_DATA } from "./Actions";
import axios from "axios";
import { getBooks } from "../services/bookService";
export const setBookData = (payload) => {
  return {
    type: BOOK_DATA,
    payload: payload,
  };
};
export const setUser = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
export const loadUser = () => {
  // console.log("inside load user");
  const token = localStorage.getItem("token");
  if (token !== null) {
    return (dispatch) => {
      return axios
        .post(`http://localhost:5000/api/user/loaduser/${token}`)
        .then((response) => {
          // console.log("reponse user", response);
          if (response.data.user) {
            const payload = {
              token: token,
              user: { ...response.data.user },
            };
            dispatch(setUser(payload));
            getBooks(response.data.user._id)
              .then((response) => {
                console.log("response redux: ", response);
                const payload = { books: response.data.books };
                dispatch(setBookData(payload));
              })
              .catch((error) => {
                console.log(error);
              });
            // loadBook(response.data.user._id);
          } else {
            logoutSuccess();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  } else {
    return (dispatch) => {
      dispatch(logoutSuccess());
    };
  }
};

export const loadBook = (uid) => {
  console.log("inside load books", uid);
  return async function (dispatch) {
    console.log("again enter");
    await axios
      .get(`http://localhost:5000/api/shelf/${uid}`)
      .then((response) => {
        console.log("response redux: ", response);
        dispatch(setBookData(response.data.books));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// export const loadBook = (uid) => {
//   console.log("heree i am");
//   if (uid !== null) {
//     return (dispatch) => {
//       return axios
//         .get(`http://localhost:5000/api/shelf/${uid}`)
//         .then((response) => {
//           console.log("reponse book", response);
//           if (response.data) {
//             // const payload = {
//             //   // token: token,
//             //   bookData: response.data.shelf,
//             // };
//             dispatch(setBookData(response.data.books));
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };
//   }
// };
