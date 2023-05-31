<template>
    <div class="container card my-4">
        <h1>Ricerca Avanzata</h1>
        <div class="row">
            <div class="col-12">
                <label for="rest-name">Nome ristorante</label>
                <input class="name-search" v-model="searchQuery" type="text" name="rest-name">
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

        fetchRestaurants() {
            axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {
                // console.log(res.data.results)
                this.restaurants = res.data.results;
                console.log(this.restaurants)
            }).catch(error => {
                console.log(error);
            });
        },

        // filteredRestaurants() {
        //     return searchQuery => {
        //         const lowerCaseQuery = searchQuery.toLowerCase();
        //         return this.restaurants.filter(restaurants => restaurants.company_name.toLowerCase().includes(lowerCaseQuery));
        //     };
        // }
    },


    computed: {
        sortedTypologies: function () {
            return this.typologies.sort(function (a, b) {
                return a.slug.localeCompare(b.slug);
            });
        },

        filteredRestaurants() {
            const lowerCaseQuery = this.searchQuery.toLowerCase();
            return this.restaurants.filter(restaurant =>
                restaurant.company_name.toLowerCase().includes(lowerCaseQuery)
            );
        }
    },
    // watch: {
    //     searchQuery() {
    //         this.filteredRestaurants();
    //     }
    // },
    created() {
        this.fetchTypologies();
        this.fetchRestaurants();
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