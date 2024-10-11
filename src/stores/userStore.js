import { makeAutoObservable } from 'mobx';

class UserStore {
    users = [];
    currentUser = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Handle login
    async login(username, password) {
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                this.currentUser = username; // Set the current user
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: 'Login failed' };
        }
    }

    // Handle logout
    async logout() {
        try {
            const response = await fetch('http://localhost:3001/users/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                this.currentUser = null; // Clear the current user
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error during logout:', error);
            return { success: false, message: 'Logout failed' };
        }
    }
}

const userStore = new UserStore();
export default userStore;
