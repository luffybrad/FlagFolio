<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Import the auth store

const userName = ref('');
const passWord = ref('');
const email = ref('');
const router = useRouter();
const authStore = useAuthStore(); // Initialize the auth store

// Function to handle form submission
const handleSubmit = async () => {
  try {
    // Call signup method from auth store
    await authStore.signup(userName.value, passWord.value, email.value);
    console.log('User signed up successfully:', userName.value); // Log success message or handle successful signup
    router.push( { name: 'Login' })
    // Optionally, redirect or show a success message here
  } catch (error) {
    console.error( error); // Log any errors during signup
  }
};
</script>

<template>
  <v-container>
    <v-row align="center" style="height: 100vh" no-gutters>
      <v-col>
        <v-card class="elevation-8">
          <v-card-title class="headline">Sign Up</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit"> <!-- Call handleSubmit on form submit -->
              <v-text-field
                v-model="userName"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email" 
                required
              ></v-text-field>
              <v-text-field
                v-model="passWord"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn class="mb-5" variant="elevated" color="primary" type="submit">Sign Up</v-btn> <!-- Submit button -->
              <br>
              <RouterLink :to="{ name: 'Login'}">
                <v-btn size="x-small" color="info" variant="text" >Already have an account?</v-btn>
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
