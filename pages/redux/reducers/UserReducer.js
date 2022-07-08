import { BOOK_DATA, LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_DATA } from "../Actions";
const initialState = {
  bookData: [],
  user: null,
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_DATA:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
      };
    case BOOK_DATA:
      return {
        ...state,
        bookData: action.payload.books,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        user: null,
      };
    default:
      return state;
  }
};
export default UserReducer;
