// import db from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "../auth/authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await auth.signOut();
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email: email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
