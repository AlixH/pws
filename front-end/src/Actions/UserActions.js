import { userService } from '../Services/UserService';

// export further user actions here, like logout, delete account...
export const userActions = {
    login
};


function login(username, password) {
console.log("dans login !");
    return dispatch => {
        dispatch(request({ username })); // dispatch request action
        console.log("ca n'arrive pas là");
        userService.login(username, password);
    };   

    function request(user) { return { type: "LOGIN_REQUEST", user } }
    function onSuccess(user) { return { type: "LOGIN_SUCCESS", user } }
    function onFailure(error) { return { type: "LOGIN_FAILURE", error } }
}

