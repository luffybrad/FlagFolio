import { defineStore } from 'pinia';

interface Flag {
  png: string;
}

interface Maps {
  googleMaps?: string;
}

interface Country {
  name: { common: string; };
  capital?: string[]; // Keep as an array
  population: number;
  area: number;
  region: string;
  subregion?: string;
  flags: Flag;
  maps?: Maps;
  unMember?: boolean;
}

interface CountryStoreState {
  countries: Country[];
  selectedCountry: string;
}

export const useCountryStore = defineStore('country', {
  state: (): CountryStoreState => ({
    countries: [],
    selectedCountry: ""
  }),

  actions: {
    async fetchCountries() {
      try {
        // const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/all`);
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        if(!response.ok){
          throw new Error("error:" + response.status)
        }
        const data: Country[] = await response.json()
         this.countries = data.map(country => ({
          name: { common: country.name.common },
          region: country.region,
          flags: { png: country.flags.png },
          capital: country.capital ? country.capital : ['N/A'], // Ensure capital is always an array
          population: country.population,
          area: country.area,
          subregion: country.subregion,
          maps:   {googleMaps: country.maps?.googleMaps} , // Optional chaining for maps
          unMember: country.unMember || false
        }));
      } catch (error) {
        console.error(error);
      }
    },

    setSelectedCountry(countryName: string) {
      this.selectedCountry = countryName;
    }
  },

  getters: {
    groupedByContinent(state): Record<string, Country[]> {
      return state.countries.reduce((acc, country) => {
        const continent = country.region || 'Unknown';
        if (!acc[continent]) {
          acc[continent] = [];
        }
        acc[continent].push(country);
        return acc;
      }, {} as Record<string, Country[]>);
    },

    filteredCountry(state): Country | undefined {
      return state.countries.find(country =>
        country.name.common.toLowerCase() === state.selectedCountry.toLowerCase()
      );
    }
  }
});
