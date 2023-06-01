<template>
    <div class="container card my-4">
      <h1>Ricerca Avanzata</h1>
      <div class="row">
        <div class="col-lg-4">
          <div class="search-sidebar">
            <label for="rest-name">Nome ristorante</label>
            <input class="name-search form-control" @keyup="filterRestaurants" v-model="searchQuery" type="text" name="rest-name">
  
            <div class="typology-list">
  <div class="typology-item" v-for="typology in sortedTypologies" :key="typology.slug">
    <input class="typology-checkbox" type="checkbox" :value="typology.id" :id="typology.slug" v-model="selectedTypologies" @change="filterRestaurants">
    <label class="typology-label text-capitalize" :for="typology.slug" @click="toggleTypology(typology)">
      {{ typology.slug }}
    </label>
  </div>

            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="search-results">
            <h3>Risultati della ricerca</h3>
            <ul class="restaurants-list list-group">
              <li class="list-group-item" v-for="restaurant in filteredRestaurants" :key="restaurant.id" @click="handleRestaurantClick(restaurant)">
                <div class="row">
                  <div class="col-4 col-md-3">
                    <img :src="restaurant.image" alt="Restaurant Image" class="restaurant-image">
                  </div>
                  <div class="col-8 col-md-9">
                    <h4>{{ restaurant.company_name }}</h4>
                    <div class="cuisine-types">
                      <span class="badge bg-primary text-light" v-for="type in restaurant.typologies" :key="type">{{ type.slug }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script>
  import axios from 'axios';
  import { debounce } from 'lodash';
  
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
      filterRestaurants: debounce(function() {
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
      }, 300),
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
  
  <style scoped>
.search-sidebar {
  margin-right: 20px;
}

.restaurant-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.cuisine-types {
  margin-top: 5px;
}

.cuisine-types .badge {
  margin-right: 5px;
}

.typology-list {
  margin-top: 10px;
}

.typology-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
}

.typology-checkbox {
  /* Nascondi il box di default */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* Stili personalizzati per il box di selezione */
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  /* Aggiungi uno sfondo colorato al box di selezione quando è selezionato */
  background-color: #5bc0de;
  margin-right: 10px;
}

.typology-checkbox:checked + .typology-label {
  background-color: #5bc0de;
  color: #fff;
}


.typology-label {
  cursor: pointer;
}


.restaurant-image {
  width: 100%;
  height: auto;
  max-height: 150px;
}

@media (min-width: 576px) {
  .custom-checkbox {
    flex: 0 0 20%;
    max-width: 20%;
  }
}

@media (min-width: 768px) {
  .custom-checkbox {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
}
</style>