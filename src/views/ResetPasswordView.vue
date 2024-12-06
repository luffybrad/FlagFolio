
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const newPassword = ref('');
const confirmPassword = ref('');
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  const token = route.query.token;
  const email = route.query.email;

  if (newPassword.value !== confirmPassword.value) {
    console.error('Passwords do not match');
    return;
  }

  try {
    await authStore.resetPassword(token as string, email as string, newPassword.value);
    console.log('Password reset successfully');
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};
</script>




<template>
    <v-container>
      <v-row align="center" style="height: 100vh" no-gutters>
        <v-col>
          <v-card class="elevation-8">
            <v-card-title class="headline">Reset Password</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn class="mb-5" variant="elevated" color="primary" type="submit">Reset Password</v-btn>
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