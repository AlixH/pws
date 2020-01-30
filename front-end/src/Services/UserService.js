
// export further user actions here, like logout, delete account...
export const userService = {
    login
};

function login(username, password) {
    console.log(`Trying to log {${userService}, ${password}}`);

    
   // need to check with @Walid if method is POST or GET 
   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

/*    return fetch(`/endPointForLogin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // create user model with profile data
            
            return user;
        });
*/

        return "OK FOR"
   
}
