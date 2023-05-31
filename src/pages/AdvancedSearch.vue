<template>
    <div class="container card my-4">

        <h1>Ricerca Avanzata</h1>
        <div class="row">
            <div class="col-12">
                <label for="rest-name">Nome ristorante</label>
                <input class="name-search" @keyup="filterRestaurants" type="text" name="rest-name">
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
            
        }
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
                console.log(this.restaurants); // Verifica l'array dei ristoranti
                this.filterRestaurants(); // Applica i filtri iniziali
            } catch (error) {
                console.error(error);
            }
        },
        filterRestaurants() {
            
        },
    },

    computed: {
        sortedTypologies: function () {
            return this.typologies.sort(function (a, b) {
                return a.slug.localeCompare(b.slug);
            });
        },

        
    },
    
    created() {
        this.fetchTypologies();
        this.fetchRestaurants();
        // console.log(this.restaurants)
    },

    updated(){
        console.log (this.selectedTypologies)
        console.log(this.restaurants)
        
        // this.fetchRestaurants();
        // this.filterRestaurants();

    }
}
</script>

<style lang="scss" scoped>
// .col-type, .col-distance, .col-delivery{
//     display: flex;
// }

.name-search {
    width: 100%;
}
</style>
