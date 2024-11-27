<script setup lang="ts">
import { useCountryStore } from '@/stores/country';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import {getCardClass } from './utils'


const countryStore = useCountryStore()
const model = ref<string | null>(null)

const selectCountry = (countryName: string) => {
    countryStore.setSelectedCountry(countryName)
  }

onMounted(() => {
  countryStore.fetchCountries()
})
</script>

<template>
        <v-row>
          <template
          v-for="(countries, continent) in countryStore.groupedByContinent"
          :key="continent"
          >
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong>{{ continent }}</strong>
            </v-col>
            <v-col>
    <v-sheet
    class="mx-auto"
    color="grey-lighten-3"
    rounded
    elevation="8"
  >
    <v-slide-group
      v-model="model"
      class=""
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="country in countries"
        :key="country.name.common"
      >
        <v-card
          class="mx-2"
          width="150"
          :class="getCardClass(continent)"
        >
          <v-img
            class="align-end"
            height="100"
            :src="country.flags.png"
            cover
          />
          <v-card-title
                    class="pt-4"
                  >
                    {{ country.name.common }}
                  </v-card-title>

                  <v-card-text>
                    <div>
                    Capital: {{ country.capital? country.capital[0] : 'N/A' }}
                  </div>
                  </v-card-text>

                  <v-card-actions>
                    <RouterLink
                      :to="{name: 'about',params: {continent: continent, country: country.name.common}}"
                      @click.prevent="selectCountry(country.name.common)"
                    >
                      <v-btn
                        class="ma-2 bg-primary"
                        color="white"
                        rounded
                      >
                        Explore
                        <v-icon
                          icon="mdi-eye"
                          end
                        />
                      </v-btn>
                    </RouterLink>
                  </v-card-actions>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  </v-col>
          </template>
        </v-row>
</template>
