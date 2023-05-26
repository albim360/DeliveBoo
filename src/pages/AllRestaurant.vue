<template>
    <div>
        <restaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" />
    </div>
</template>
  
<script>
import axios from 'axios';
import restaurantCard from '../components/CardRestaurantComponent.vue'

export default {
    components: {
        restaurantCard
    },
    data() {
        return {
            restaurants: []
        };
    },
    methods: {
        fetchRestaurants() {
            axios
                .get('http://127.0.0.1:8000/api/restaurants')
                .then(res => {
                    const results = res.data.results;
                    this.restaurants = results;
                    console.log(this.restaurants);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.fetchRestaurants();
    }
};
</script>
  
<style scoped>
/* Stili CSS specifici per questo componente */
</style>
  