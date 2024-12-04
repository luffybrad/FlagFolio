<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Import the auth store

const userName = ref('');
const passWord = ref('');
const router = useRouter();
const authStore = useAuthStore(); // Initialize the auth store

// Function to handle form submission
const handleSubmit = async () => {
  try {
    // Call signup method from auth store
    await authStore.signin(userName.value, passWord.value);
    console.log('User signed in successfully:', userName.value); // Log success message or handle successful signup
    router.push({ name: 'home'})
    // Optionally, redirect or show a success message here
  } catch (error) {
    console.error('Error during signup:', error); // Log any errors during signup
  }
};
</script>

<template>
  <v-container>
    <v-row align="center" style="height: 100vh" no-gutters>
      <v-col>
        <v-card class="elevation-8">
          <v-card-title class="headline">Login</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleSubmit"> <!-- Call handleSubmit on form submit -->
              <v-text-field
                v-model="userName"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="passWord"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn  class="mb-5" color="primary" variant="elevated" type="submit">Login</v-btn> <!-- Submit button -->
              <br>
              <RouterLink :to="{ name: 'Signup'}">
                <v-btn size="x-small" color="info" variant="text" >Create account?</v-btn>
              </RouterLink>
              <br>
              <RouterLink :to="{ name: 'Forgotpassword'}">
                <v-btn size="x-small" color="warning" variant="text" >Forgot passowrd?!</v-btn>
              </RouterLink>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add any specific styles here */
</style>
