<script setup lang="ts">
import { useCountryStore } from '@/stores/country';
import { onMounted, ref } from 'vue';

const countryStore = useCountryStore()
const model = ref(null)


onMounted(() => {
  countryStore.fetchCountries()
})
</script>

<template>
  <v-container>
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
      class="pa-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="country in countries"
        :key="country.name"
        v-slot="{ isSelected, toggle }"
      >
        <v-card
          class="mx-2"
          color="grey-lighten-2"
          width="200"
          @click="toggle"
        >
          <v-img
            class="align-end"
            height="200"
            :src="country.flag"
            cover
          />
          <v-card-title
                    class="pt-4"
                  >
                    {{ country.name }}
                  </v-card-title>

                  <v-card-text>
                    <div>
                    Captial: {{ country.capital }}
                  </div>
                  </v-card-text>

                  <v-card-actions>
                    <RouterLink
                      :to="{name: 'about',params: {continent: continent, country: country.name}}"
                      @click="countryStore.setSelectedCountry(country.name)"
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
      </v-container>
</template>
