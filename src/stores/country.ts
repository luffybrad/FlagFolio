import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountryStore = defineStore('country', {

  state: () => ({
    countries: [],
    selectedCountry: ""
  }),

  actions: {
    async fetchCountries() {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`)
        this.countries = response.data
        // .map(country => ({
        //   name: country.name.common,
        //   continent: country.region
        // }))
      }catch(error){
        console.error(error)
      }
    },
    setSelectedCountry(countryName){
      this.selectedCountry = countryName
    }
},
getters: {
    allCountries(state){
        return state.countries.map(country => ({
          name: country.name.common,
          continent: country.region,
          flag: country.flags.svg,
          capital: country.capital? country.capital[0]: 'N/A',
          population: country.population,
          area: country.area,
          subregion: country.subregion,
          maps: country.maps,
          unMembership: country.unMember
        }))
    },
    groupedByContinent(){
    return this.allCountries.reduce((acc, country) => {
      // const { continent, name} = country;
      if(!acc[country.continent]){
        acc[country.continent] = [];
      }
      acc[country.continent].push(country)
      return acc
    }, {});
    },
    filteredCountry(state){
      return this.allCountries.find(country => country.name.toLowerCase() === state.selectedCountry.toLowerCase())
    }
}
})

