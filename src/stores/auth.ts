import { defineStore } from 'pinia';

interface AuthState {
  token: string | null; // JWT token
  username: string | null

  alertVisible: boolean; // To control alert visibility
  alertMessage: string; // Message to display in alert
  alertType: 'error' | 'success' | 'warning' | 'info' | undefined; // Restricted types
  alertIcon: string; // Icon for the alert
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    alertVisible: false,
    alertMessage: '',
    alertType: undefined,
    alertIcon: '',
  }),
  actions: {
    async signup(username: string, password: string) {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.showAlert(errorData.message || 'Failed to sign up!', 'error','$error', 3000)
        throw new Error(errorData.message || 'Failed to sign up');
      }

      const data = await response.json();
      this.token = data.token;  // Store token if returned
      this.username = username
      localStorage.setItem('token', this.token as string);
      localStorage.setItem('username', this.username)
      this.showAlert('Signed up successfully!', 'success','$success', 3000)
      return data;
    },

    async signin(username: string, password: string) {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Send username and password
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.showAlert(errorData.message || 'Failed to sign in!', 'error','$error', 3000)
        throw new Error(errorData.message || 'Failed to sign in');
      }

      const data = await response.json();
      this.token = data.token; // Store token if returned
      this.username = username
      localStorage.setItem('token', this.token as string);
      localStorage.setItem('username', this.username)
      this.showAlert('Signed in successfully!', 'success','$success', 3000)
      return data;
    },

    async forgotPassword(username:string){
        const response = await fetch('http://localhost:5000/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.showAlert(errorData.message || 'Failed to send reset link!', 'error', '$error', 3000);
          throw new Error(errorData.message || 'Failed to send reset link');
        }
    },


    signout() {
      this.token = null; // Clear token on signout
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.showAlert('Signed out successfully!', 'warning', '$warning', 3000);
    },

    isAuthenticated() {
      return this.token;// Check if user is authenticated based on token presence
    },


    checkTokenExpiration() {
      // Logic to check if the token is expired (optional)
      if (this.token) {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (payload.exp < currentTime) {
          this.signout(); // Automatically log out if the token is expired
          this.showAlert('Session expired! Please log in again.', 'warning', 'mdi-clock-alert', 3000);
          return true
        }
      }
      return false
    },

    showAlert(message: string, type: 'error' | 'success' | 'warning' | 'info', icon: string, duration: number) {
      this.alertMessage = message;
      this.alertType = type;
      this.alertIcon = icon;
      this.alertVisible = true;

      setTimeout(() => {
        this.alertVisible = false;
      }, duration);
    }


  },
});
