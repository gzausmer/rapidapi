
export function initApiService() {

        let realFetch = window.fetch;
        window.fetch = function (url, opts) {
            return new Promise((resolve, reject) => {
                // wrap in timeout to simulate server api call
                setTimeout(() => {
                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    // authenticate
                    if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                        // get parameters from post request
                        let params = JSON.parse(opts.body);

                        // find if any user matches login credentials
                        let filteredUsers = users.filter(user => {
                            return user.username === params.username && user.password === params.password;
                        });

                        if (filteredUsers.length) {
                            // if login details are valid return user details
                            let user = filteredUsers[0];
                            let responseJson = {
                                id: user.id,
                                username: user.username,
                                thumbnail: user.thumbnail,
                                position: user.position,
                            };
                            resolve({ok: true, json: () => responseJson});
                        } else {
                            // else return error
                            reject('Username or password is incorrect');
                        }

                        return;
                    }

                    // pass through any requests not handled above
                    realFetch(url, opts).then(response => resolve(response));

                }, 500);
            });
        }
}

