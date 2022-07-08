import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LandingPage from "./LandingPage";
import UserReducer from "./redux/reducers/UserReducer";
import userReducer from "./redux/Slices";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

const store = createStore(UserReducer, compose(applyMiddleware(thunk)));

export default function Home() {
  return (
    <div>
      {/* <Provider store={store}> */}
      <LandingPage />
      {/* </Provider> */}
    </div>
  );
}
