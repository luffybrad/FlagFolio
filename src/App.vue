<script setup lang="ts">
import { RouterView } from 'vue-router'
import {onMounted, ref } from 'vue'
import { useCountryStore } from './stores/country';

  const drawer = ref(false)

  const open = ref(["Continents"])

  const countryStore = useCountryStore();

  const selectCountry = (countryName: string) => {
    countryStore.setSelectedCountry(countryName)
  }

  onMounted(() => {
    countryStore.fetchCountries()
  })
</script>

<template>
   <v-app id="inspire">

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>FlagFolio</v-app-bar-title>


      <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>


    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
      >

        <v-list-item
        prepend-avatar="@/assets/worldmap.png"
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

    <v-main class="bg-grey-lighten-4">
        <RouterView />
      </v-main>
  </v-app>
</template>

