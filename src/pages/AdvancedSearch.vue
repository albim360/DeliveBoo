<template>
    <div class="container card my-4">
      <h1>Ricerca Avanzata</h1>
      <div class="row">
        <div class="col-12">
          <label for="rest-name">Nome ristorante</label>
          <input class="name-search" @keyup="filterRestaurants" v-model="searchQuery" type="text" name="rest-name">
        </div>
      </div>
      <div class="row d-flex card-body">
        <div class="col row col-type d-flex">
          <label for="cook-type">Tipo di cucina</label>
          <div class="form-check col-2" v-for="typology in sortedTypologies" :key="typology.slug">
            <input class="form-check-input" type="checkbox" :value="typology.id" :id="typology.slug"
              v-model="selectedTypologies" @change="filterRestaurants">
            <label class="form-check-label text-capitalize" :for="typology.slug">{{ typology.slug }}</label>
          </div>
        </div>
      </div>
      <div class="search-results">
        <h3>Risultati della ricerca</h3>
        <ul class="restaurants-list">
          <li v-for="restaurant in filteredRestaurants" :key="restaurant.id" @click="handleRestaurantClick(restaurant)">
            {{ restaurant.company_name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        typologies: [],
        restaurants: [],
        filteredRestaurants: [],
        selectedTypologies: [],
        searchQuery: '',
      };
    },
    methods: {
      async fetchTypologies() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/typologies');
          this.typologies = response.data.results;
        } catch (error) {
          console.error(error);
        }
      },
      async fetchRestaurants() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/restaurants');
          this.restaurants = response.data.results;
          this.filterRestaurants();
        } catch (error) {
          console.error(error);
        }
      },
      filterRestaurants() {
        // Applica i filtri sui ristoranti in base al nome e ai tipi di cucina selezionati
        const filteredRestaurants = this.restaurants.filter(restaurant => {
          // Filtra per nome ristorante
          const lowerCaseName = restaurant.company_name.toLowerCase();
          if (lowerCaseName.includes(this.searchQuery.toLowerCase())) {
            // Filtra per tipologie selezionate
            if (this.selectedTypologies.length > 0) {
              return restaurant.typologies.some(typology => this.selectedTypologies.includes(typology.id));
            } else {
              return true;
            }
          }
          return false;
        });
        this.filteredRestaurants = filteredRestaurants;
      },
      handleRestaurantClick(restaurant) {
        // Reindirizza alla pagina del ristorante
        this.$router.push(`/restaurants/${restaurant.slug}`);
      },
    },
    computed: {
      sortedTypologies() {
        return this.typologies.sort((a, b) => a.slug.localeCompare(b.slug));
      },
    },
    created() {
      this.fetchTypologies();
      this.fetchRestaurants();
    },
  };
  </script>
  