<template>
    <div>
        <div class="cart">
            <h3>Carrello</h3>
            <ul>
                <li v-for="product in cart" :key="product.id">
                    {{ product.name }} - {{ product.price | currency }}
                    <button @click="removeFromCart(product)">Rimuovi</button>
                </li>
            </ul>
            <p>Totale: {{ calculateTotalPrice() | currency }}</p>
        </div>
        <product-card v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />

    </div>
</template>
  
<script>
import ProductCard from '../components/CardProductComponent.vue';
import axios from 'axios';

export default {
    components: {
        ProductCard,
    },
    data() {
        return {
            products: [],
            cart: [],
        };
    },
    methods: {
        fetchProducts() {
            axios
                .get('http://127.0.0.1:8000/api/products')
                .then(res => {
                    this.products = res.data.results;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        addToCart(product) {
            this.cart.push(product);
        },
        removeFromCart(product) {
            const index = this.cart.indexOf(product);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        calculateTotalPrice() {
            return this.cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
        },
    },
    filters: {
        currency(value) {
            return parseFloat(value).toFixed(2);
        },
    },
    mounted() {
        this.fetchProducts();
    },
};
</script>





  
  