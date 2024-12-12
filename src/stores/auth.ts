import { defineStore } from 'pinia';


const api = 'https://wren-wealthy-minnow.ngrok-free.app'


interface AuthState {
  token: string | null; // JWT token
  username: string | null
  email: string | null

  alertVisible: boolean; // To control alert visibility
  alertMessage: string; // Message to display in alert
  alertType: 'error' | 'success' | 'warning' | 'info' | undefined; // Restricted types
  alertIcon: string; // Icon for the alert
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    //initialize credentials from localstorage
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    alertVisible: false,
    alertMessage: '',
    alertType: undefined,
    alertIcon: '',
  }),



  actions: {
    async signup(username: string, password: string, email: string) {
      const response = await fetch(api+'/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Send username, password, email
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
      localStorage.setItem('email', this.email as string)
      this.showAlert('Signed up successfully!', 'success','$success', 3000)
      return data;
    },

    async signin(username: string, password: string) {
      const response = await fetch(api+'/signin', {
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
      localStorage.setItem('email', this.email as string)
      this.showAlert('Signed in successfully!', 'success','$success', 3000)
      return data;
    },

    async forgotPassword(email:string) { // Accept email as parameter
      const response = await fetch(api + '/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email for reset link
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.showAlert(errorData.message || 'Failed to send reset link!', 'error', '$error', 3000);
        throw new Error(errorData.message || 'Failed to send reset link');
      }
      this.showAlert('Reset link sent! Check your email.', 'success', '$success', 3000);
    },

    async resetPassword(token:string, email:string, password:string) { // Accept token, email, and new password as parameters
      const response = await fetch(api + '/resetPassword', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ token, email, password }), // Send token and new password for resetting
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.showAlert(errorData.message || 'Failed to reset password!', 'error', '$error', 3000);
        throw new Error(errorData.message || 'Failed to reset password');
      }

      this.showAlert('Password has been successfully updated.', 'success', '$success', 3000);
    },


    signout() {
      this.token = null; // Clear token on signout
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
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
