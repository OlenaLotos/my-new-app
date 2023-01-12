import db from "../../firebase/config";

export const authSighUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSighInUser = () => async (dispatch, getState) => {};
export const authSighOutUser = () => async (dispatch, getState) => {};

// export { authSighInUser, authSighUpUser, authSighOutUser };
