import React from "react";
import styles from "../styles/Landing.module.css";
import { Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { registerRequest } from "./services/userService";
function Register() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    registerRequest(data)
      .then((response) => {
        toast("Account created successfully. Please login now");
        setTimeout(() => {
          router.push("/LandingPage");
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.centerFlex}>
        <div className={styles.space}>
          <label>Username:</label>
          <input
            {...register("username", { required: true })}
            placeholder="Enter Username"
          />
          {errors.username?.type === "required" && (
            <p className={styles.errors}>Username is required</p>
          )}
        </div>
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
            {...register("password", { required: true, min: 8 })}
            placeholder="Enter Password"
          />
          {errors.password?.type === "required" && (
            <p className={styles.errors}>Password is required</p>
          )}
          {errors.email?.type === "length" && (
            <p className={styles.errors}>Password must be 8 characters long</p>
          )}
        </div>
        <input
          style={{ marginTop: "20px", marginRight: "20px" }}
          value="Register"
          type="submit"
        />
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
