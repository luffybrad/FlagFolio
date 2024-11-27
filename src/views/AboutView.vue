<script setup lang="ts">
import { useCountryStore } from '@/stores/country';
import { onMounted, computed, onUpdated } from 'vue';
import {getCardClass } from './utils';

const props = defineProps<{
  continent: string;
  countryName: string;
}>();

const countryStore = useCountryStore();

const countrySpecs = computed(() => {
    return countryStore.filteredCountry;
});
//change

onUpdated(() => {
  countryStore.setSelectedCountry(props.countryName)
});

onMounted(()=> {
  countryStore.fetchCountries()
  countryStore.setSelectedCountry(props.countryName)
});

</script>

<template>
  <v-card
  v-if="countrySpecs"
    :class="['mx-auto my-6', getCardClass(countrySpecs.region) ]"
    max-width="400"
  >
    <v-img
      color="surface-variant"
      height="200"
      :src="countrySpecs.flags.png"
      cover
    />
    <v-card-text>
      <div
        class="font-weight-bold ms-1 mb-2"
      >
      {{ countrySpecs.name.common }}
      </div>

      <v-timeline
        density="compact"
      >
      <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
              Sub-region:  {{ countrySpecs.subregion || 'N/A'}}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <div class="font-weight-normal">
               Capital:  {{ countrySpecs.capital? countrySpecs.capital[0] : 'N/A' }}
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
              UN Member: {{ countrySpecs.unMember? 'Yes' : 'No' }}
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          size="x-small"
        >
          <div>
            <a :href="countrySpecs.maps?.googleMaps" target="_blank" rel="noopener"
            class="font-weight-normal text-decoration-underline">
              Check it out on Google Maps
          </a>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
  <!-- if country is not found -->
   <div
   v-else
   >
      <h1>Country Not Found!!</h1>
   </div>
</template>
