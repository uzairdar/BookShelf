import React, { useEffect } from "react";
import styles from "../styles/Landing.module.css";
import { Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { loginRequest } from "./services/userService";
import { loadUser, setUser } from "./redux/ActionCreators";
function LandingPage(props) {
  const { user, getUser } = props;
  const router = useRouter();
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user) {
      router.push("/Dashboard");
    }
  }, [user]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    loginRequest(data)
      .then((response) => {
        if (response?.data) {
          props.setUserData(response.data);
          router.push("/Dashboard");
        } else {
          toast("Login Failed!");
        }
      })
      .catch((error) => {
        console.log("err", error);
        toast("Login Failed!");
      });
  };
  return (
    <>
      <div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.centerFlex}>
          <div className={styles.space}>
            <label>Email:</label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              placeholder="Enter Email"
            />
            {errors.email?.type === "required" && (
              <p className={styles.errors}>email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className={styles.errors}>Email is not valid form</p>
            )}
          </div>
          <div className={styles.space}>
            <label>Password:</label>
            <input
              {...register("password", { required: true })}
              placeholder="Enter Password"
            />
            {errors.password?.type === "required" && (
              <p className={styles.errors}>Password is required</p>
            )}
          </div>

          <Button
            style={{ marginTop: "20px", marginRight: "20px" }}
            value=""
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Link href="/Register">
          <a>
            <Button style={{ marginTop: "25px" }}>Register</Button>
          </a>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  // console.log("state", state);
  const { user } = state;
  return { user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (user) => dispatch(setUser(user)),
    getUser: () => dispatch(loadUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
