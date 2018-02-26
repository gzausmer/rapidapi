    import thumbnail from '../components/HomePage/userThumbnail.png'
    import {history} from "../router/history"

    class UserService {

        constructor() {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
        }

        login(username, password) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            };
            return fetch('/users/authenticate', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(user => {
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                    return user;
                });
        };


        persistUserPosition(localUser) {
            const foundIndex = this.users.findIndex(user => user.id === localUser.id);
            this.users[foundIndex] = Object.assign({}, this.users[foundIndex], localUser);

            localStorage.setItem('users', JSON.stringify(this.users));
        };

        logout(localUser) {
            this.persistUserPosition(localUser);
            localStorage.removeItem('user');
            history.push('/login');
        };

        setMockUser() {

            if (this.users.find(user => user.id === 1776)) { return; }

            const mockUser = {
                id: 1776,
                username: 'rapidapi',
                password: 'pass',
                thumbnail,
            };
            this.users.push(mockUser);
            localStorage.setItem('users', JSON.stringify(this.users));
        };

    }

    export const userService = new UserService();