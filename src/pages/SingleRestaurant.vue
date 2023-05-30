<template>
    <div>
        <h2>Ristorante: {{ restaurant.company_name }}</h2>
        <div class="card" v-for="product in products" :key="product.id">
            <div class="card-content">
                <div>
                    <strong>{{ product.name }}</strong>
                </div>
                <div>
                    Descrizione: {{ product.description }}
                </div>
                <div>
                    Prezzo: {{ product.price | currency }}
                </div>
                <button @click="addToCart(product)">Aggiungi al carrello</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            restaurant: null,
            products: [],
        };
    },
    methods: {
        addToCart(product) {
            this.$emit('add-to-cart', product);
        },
        fetchRestaurantData() {
            axios
                .get(`http://localhost:8000/api/restaurants/${this.slug}`)
                .then((response) => {
                    this.restaurant = response.data;
                    this.fetchProducts();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchProducts() {
            axios
                .get(`http://localhost:8000/api/products?restaurant_id=${this.restaurant.id}`)
                .then((response) => {
                    this.products = response.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    filters: {
        currency(value) {
            return parseFloat(value).toFixed(2);
        },
    },
    mounted() {
        this.fetchRestaurantData();
    },
};
</script>
  
<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
}

.card-content {
    margin-top: 5px;
}
</style>
  
  