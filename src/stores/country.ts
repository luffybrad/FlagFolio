import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountryStore = defineStore('country', {

  state: () => ({
    countries: [],
    continents: []
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
          subregion: country.subregion
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
    }
}
})

