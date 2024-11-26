<script setup lang="ts">
import { useCountryStore } from '@/stores/country';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';



    const location = useRoute()
    const countryName = location.params.country

    const countryStore = useCountryStore();
    const countrySpecs = countryStore.filteredCountry


    onMounted(()=> {
      countryStore.fetchCountries()
      countryStore.setSelectedCountry(countryName)
    })

</script>

<template>
  <v-card
    class="mx-auto my-6"
    max-width="400"
  >
    <v-img
      color="surface-variant"
      height="200"
      :src="countrySpecs.flag"
      cover
    />
    <v-card-text>
      <div
        class="font-weight-bold ms-1 mb-2"
      >
      {{ countrySpecs.name }}
      </div>

      <v-timeline
        density="compact"
      >
      <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
              Sub-region:  {{ countrySpecs.subregion }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
               Capital:  {{ countrySpecs.capital }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
               Population: {{ countrySpecs.population }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
              Area: {{ countrySpecs.area }} Km <sup>2</sup>
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
              UN Member: {{ countrySpecs.unMembership }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <a href="{{ countrySpecs.maps.googleMaps }}"
            class="font-weight-normal text-decoration-underline">
              Check it out on Google Maps
          </a>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
