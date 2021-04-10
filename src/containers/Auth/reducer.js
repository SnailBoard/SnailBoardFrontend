import {getUserRoutine, loginRoutine, logoutRoutine, registerRoutine} from "./routines";

const initialState = {
    // user: {},
    isAuthorized: false,
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case logoutRoutine.TRIGGER: {
            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            return ({
                ...state,
                isAuthorized: false,
                // user: {}
            });
        }

        case registerRoutine.REQUEST:
        case loginRoutine.REQUEST: {
            return ({
                ...state,
                isFetching: true
            });
        }

        case loginRoutine.SUCCESS: {
            const  { accessToken, refreshToken } = action.payload;
            console.log("Success login request")
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            return ({
                ...state,
                // user: user,
                isAuthorized: true,
                isFetching: false
            });
        }

        case registerRoutine.SUCCESS:
            console.log("Success reg request")
            return ({
                ...state,
                isFetching: false
            })


        case getUserRoutine.SUCCESS: {
            const user = action.payload;
            return ({
                ...state,
                isAuthorized: true,
                // user: user
            });
        }

        default:
            return state;
    }
}