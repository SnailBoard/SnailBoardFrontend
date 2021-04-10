import callWebApi from "../../helpers/api";

export const loginRequest = async loginData => {
    const response = await callWebApi({
        endpoint: "/api/auth",
        type: "POST",
        skipAuthorization: true,
        request: loginData
    });
    // const resp = await response.json()
    // console.log("Response from auth  ", resp)
    return response.json();
};

export const registerRequest = async registerData => {
    const response = await callWebApi({
        endpoint: "/api/register",
        type: "POST",
        skipAuthorization: true,
        request: registerData
    });
    return response.text();
};
//
// export const getUserRequest = async () => {
//     try {
//         const response = await callWebApi({
//             endpoint: "/api/user",
//             type: "GET",
//         });
//         return response.json();
//     } catch (e) {
//         return null;
//     }
// };