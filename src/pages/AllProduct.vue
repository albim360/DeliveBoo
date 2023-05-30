<template>
    <div>
        <div class="cart">
            <h3>Carrello</h3>
            <ul>
                <li v-for="product in cartProducts" :key="product.id">
                    {{ product.name }} - {{ product.price | currency }} x {{ product.quantity }}
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
            restaurantId: null,
        };
    },
    computed: {
        cartProducts() {
            const products = [];
            for (const product of this.cart) {
                const existingProduct = products.find((p) => p.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    products.push({ ...product, quantity: 1 });
                }
            }
            return products;
        },
    },
    methods: {
        fetchProducts() {
            axios
                .get('http://127.0.0.1:8000/api/products')
                .then(res => {
                    this.products = res.data.results;
                    this.restoreCart(); // Ripristina il carrello dopo aver ottenuto i prodotti
                })
                .catch(err => {
                    console.error(err);
                });
        },
        addToCart(product) {
            if (this.restaurantId === null || product.restaurantId === this.restaurantId) {
                this.restaurantId = product.restaurantId;
                this.cart.push(product);
                this.saveCart(); // Salva il carrello dopo aver aggiunto un prodotto
            } else {
                console.log("Impossibile aggiungere il prodotto al carrello. Appartiene a un ristorante diverso.");
            }
        },
        removeFromCart(product) {
            const index = this.cart.findIndex((item) => item.id === product.id);
            if (index !== -1) {
                this.cart.splice(index, 1);
                this.saveCart(); // Salva il carrello dopo aver rimosso un prodotto
            }
        },
        calculateTotalPrice() {
            return this.cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        restoreCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
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

  





  
  