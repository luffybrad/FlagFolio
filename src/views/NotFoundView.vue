<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    height="250"
    max-width="800"
    width="100%"
    rounded
  >
    <div>
      <h2 class="text-h4 font-weight-black text-orange">Oops!</h2>

      <div class="text-h5 font-weight-medium mb-2">
        404. Page Not Found
      </div>


      <RouterLink :to="{name: 'home'}">
      <v-btn color="orange" variant="text">Go to Home</v-btn>
      </RouterLink>
    </div>
  </v-sheet>
    </v-row>
  </v-container>

</template>
