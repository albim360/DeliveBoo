<template>
    <div class="container card my-4">
        <h1>Ricerca Avanzata</h1>
        <div class="row">
            <div class="col-12">
                <label for="rest-name">Nome ristorante</label>
                <input class="name-search" v-model="searchQuery" @keyup="filterRestaurants" type="text" name="rest-name">
            </div>
        </div>
        <div class="row d-flex card-body">
            <div class="col row col-type d-flex ">
                <label for="cook-type">Tipo di cucina</label>
                <div class="form-check col-2" v-for="typology in sortedTypologies" :key="typology.slug">
                    <input class="form-check-input" type="checkbox" :value="typology.id" id="typology-{{typology.slug}}">
                    <label class="form-check-label text-capitalize" for="typology-{{typology.slug}}">{{ typology.slug
                    }}</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
                {{ restaurant.company_name }}
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
        }
    },
    methods: {
        fetchTypologies() {
            axios
                .get('http://127.0.0.1:8000/api/typologies')
                .then(res => {
                    console.log(res.data.results[0].slug); // stampa la risposta dell'API nella console
                    this.typologies = res.data.results;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        searchRestaurants() {
            axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {
                console.log(res.data.results)
                this.restaurants = res.data.results;
                // console.log(this.restaurants)
            }).catch(error => {
                console.log(error);
            });
        },

        filterRestaurants(restaurants, searchQuery) {
            return this.filteredRestaurants = this.restaurants.includes(searchQuery)
            // if (!searchQuery) {
            //     // se la stringa di ricerca è vuota, restituisci l'intero array di ristoranti
            //     return restaurants;
            // }

            // // converti la stringa di ricerca in minuscolo per effettuare una ricerca case-insensitive
            // const searchLowerCase = searchQuery.toLowerCase();

            // // filtra gli elementi dell'array che contengono la stringa di ricerca nel nome
            // const filteredRestaurants = restaurants.filter((restaurant) => {
            //     const nameLowerCase = restaurant.name.toLowerCase();
            //     return nameLowerCase.includes(searchLowerCase);
            // });

            // return this.filteredRestaurants = filteredRestaurants;
        }
    },


    computed: {
        sortedTypologies: function () {
            return this.typologies.sort(function (a, b) {
                return a.slug.localeCompare(b.slug);
            });
        }
    },
    created() {
        this.fetchTypologies();
        this.searchRestaurants();
        console.log(this.res)
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