<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();
const userName = ref('');


// Function to handle form submission
const handleForgotPassword = async () => {
  try {
    // Call signup method from auth store
    await authStore.forgotPassword(userName.value);
    console.log('Username registered successfully:', userName.value); // Log success message or handle successful signup
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
          <v-card-title class="headline">Forgot Password</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleForgotPassword">
              <v-text-field
                v-model="userName"
                label="Enter your username"
                required
              ></v-text-field>
              <v-btn class="mb-5" variant="elevated" color="primary" type="submit">Send Reset Link</v-btn>
              <br>
              <RouterLink :to="{ name: 'Login'}">
                <v-btn size="x-small" color="info" variant="text" >Back to login</v-btn>
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
