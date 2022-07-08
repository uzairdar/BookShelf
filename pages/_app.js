import "../styles/globals.css";
// import "~node_modules/bootstrap/scss/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserReducer from "./redux/reducers/UserReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
const store = createStore(UserReducer, compose(applyMiddleware(thunk)));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
