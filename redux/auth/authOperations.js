// import db from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export const authSighUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("email", email);
    console.log("password", password);
    console.log("login", login);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSighInUser = () => async (dispatch, getState) => {};
export const authSighOutUser = () => async (dispatch, getState) => {};
