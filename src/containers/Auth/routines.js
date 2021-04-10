import {createRoutine} from "redux-saga-routines";

export const loginRoutine = createRoutine("login");
export const registerRoutine = createRoutine("register");
export const getUserRoutine = createRoutine("getUser");
export const logoutRoutine = createRoutine("logout");