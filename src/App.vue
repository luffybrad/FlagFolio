<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import {onMounted, ref, computed, onUpdated } from 'vue'
import { useCountryStore } from './stores/country';
import worldmapImg from '@/assets/worldmap.png'
import { useAuthStore } from './stores/auth';

  const drawer = ref(false)

  const open = ref(["Continents"])

  const items = ref([
        { title: 'Profile' },
        { title: 'Delete account' }
      ],
  )

  const countryStore = useCountryStore();
  const router = useRouter()

  const authStore = useAuthStore();
  const isAuthenticated = computed(() =>
    authStore.isAuthenticated()
  )
  const logout = () => {
   authStore.signout();
   router.push('/login')
  };

  const searchInputVisible = ref(false); // Track visibility of the search input
  const searchQuery = ref<string>(""); // Track the user's search query

  const filteredCountries = computed(() => {
  // Filter countries based on the search query
  return countryStore.countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 10);
});





  const selectCountry = (countryName: string) => {
    countryStore.setSelectedCountry(countryName)
  }

  onUpdated(() => {
    authStore.checkTokenExpiration()
  })

  onMounted(() => {
    countryStore.fetchCountries()
  })

  // Toggle search input visibility
const toggleSearchInput = () => {
  searchInputVisible.value = !searchInputVisible.value;
  if (!searchInputVisible.value) {
    searchQuery.value = ""; // Clear search query when hiding input
  }
};
</script>

<template>
   <v-app id="inspire">

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>FlagFolio</v-app-bar-title>


      <v-spacer></v-spacer>


         <!-- Toggle between input field and magnifying icon -->
      <v-btn icon @click="toggleSearchInput">
        <v-icon>{{ searchInputVisible ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
      </v-btn>

      <!-- Search Input Field -->
      <v-text-field
        v-if="searchInputVisible"
        v-model="searchQuery"
        label="Search"
        clearable
      ></v-text-field>

      <!-- Display username if authenticated -->

      <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
        v-if="isAuthenticated"
      prepend-icon="mdi-account-circle"
      size="x-small"
      variant="outlined"
      rounded
      color="success"
          v-bind="props"
        >
          {{ authStore.username }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>





      <v-btn
       v-if="isAuthenticated"
      @click="logout"
      size="small"
      color="error"
      variant="text"
      rounded
      icon="mdi-logout"
      ></v-btn>



    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
      >

        <v-list-item
        :prepend-avatar="worldmapImg"
        title="Countries"
        subtitle="Wander Beyond Borders"
          nav
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav v-model:opened="open">
          <v-list-item
          prepend-icon="mdi-earth" title="All Countries" value="home" to="/"></v-list-item>

          <v-list-group
          v-for="(countries, continent) in countryStore.groupedByContinent"
          :key="continent"
          >
          <template
          v-slot:activator="{props}">
            <v-list-item
              v-bind="props"
              :title="continent"
              :key="continent"
            />
          </template>

          <v-list-item
            v-for="country in countries"
            :key="country.name.common"
            :title="country.name.common"
            :prepend-avatar="country.flags.png"
            :to="{name: 'about',params: {continent: continent, country: country.name.common}}"
            @click="selectCountry(country.name.common)"
          />
          </v-list-group>


        </v-list>

      </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4 position-relative">


      <!-- Alert for messages -->
      <v-alert v-if="authStore.alertVisible" :type="authStore.alertType" :icon="authStore.alertIcon" dismissible
      variant="outlined"
      >
         {{ authStore.alertMessage }}
       </v-alert>



    <!-- Show loading indicator -->
    <div v-if="countryStore.loading" class="centered-overlay">
        <v-progress-circular indeterminate color="primary" :size="128" :width="10" />
        </div>

<!-- Show error message -->
<div v-if="countryStore.error" class="centered-overlay error-message">
  <v-alert
    :text="countryStore.error"
    title="Error"
    type="error"
    density="compact"
  ></v-alert>
      </div>

    <!-- Render RouterView only when not loading or showing an error -->
    <RouterView v-if="!countryStore.loading && !countryStore.error" />

           <!-- Suggestions List -->
           <div v-if="searchInputVisible && filteredCountries.length > 0" class="suggestions-list">

        <v-list density="compact" rounded bg-color="grey-lighten-1"
        base-color="blue-darken-4"
        color="orange-accent-4">
          <v-list-item
          v-for="country in filteredCountries"
          :key="country.name.common"
          tile
          :title="country.name.common"
          prepend-icon="mdi-map-search"
          density="compact"
          router :to="{ name: 'about', params: { continent: country.region, country: country.name.common } }"
          @click.prevent.stop = "selectCountry(country.name.common)"
          >
          <!-- <RouterLink
            :to="{ name: 'about', params: { continent: country.region, country: country.name.common } }
            "
            @click = "selectCountry(country.name.common)"
            >
            {{ country.name.common }}
            </RouterLink> -->
          </v-list-item>
        </v-list>
      </div>

      </v-main>
  </v-app>
</template>

<style scoped>
.centered-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.error-message{
  width: auto;
}
.suggestions-list {
  position: absolute; /* Position it relative to its parent */
  top: 60px; /* Adjust based on your layout */
  right: 20px; /* Adjust based on your layout */
  background-color: aqua;
  text-decoration-line: none;
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1); /* Shadow for depth */
}
</style>
