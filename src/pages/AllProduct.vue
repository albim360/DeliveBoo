<template>
    <div>
        <productCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>
  
<script>
import axios from 'axios';
import productCard from '../components/CardProductComponent.vue'

export default {
    components: {
        productCard
    },
    data() {
        return {
            products: []
        };
    },
    methods: {
        fetchProducts() {
            axios
                .get('http://127.0.0.1:8000/api/products')
                .then(res => {
                    const results = res.data.results;
                    this.products = results;
                    console.log(this.products);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.fetchproducts();
    }
};
</script>
  
<style scoped>
/* Stili CSS specifici per questo componente */
</style>