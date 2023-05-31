<template>
    <div>
        <div class="cart">
            <h3>Carrello</h3>
            <div v-if="showRestaurantWarning" class="alert alert-warning mt-3">
                Impossibile aggiungere il prodotto al carrello. Appartiene a un ristorante diverso.
            </div>

            <ul>
                <li v-for="product in cartProducts" :key="product.id">
                    {{ product.name }} - {{ product.price | currency }} x {{ product.quantity }}
                    <button @click="removeFromCart(product)">Rimuovi</button>
                </li>
            </ul>
            <p>Totale: {{ calculateTotalPrice() | currency }}</p>
        </div>
        <div v-if="restaurant">
            <h2>Ristorante: {{ restaurant.company_name }}</h2>
            <div class="card" v-for="product in restaurant.products" :key="product.id">
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
    </div>
</template>
  
<script>
import ProductCard from '../components/CardProductComponent.vue';
import axios from 'axios';

export default {
    components: {
        ProductCard,
    },
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
            cart: [],
            restaurantId: null,
            showRestaurantWarning: false,
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
        fetchRestaurantData() {
            axios
                .get(`http://127.0.0.1:8000/api/restaurants/${this.slug}`)
                .then((response) => {
                    this.restaurant = response.data.results;
                    console.log(response);

                    // this.fetchProducts();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchProducts() {
            axios
                .get(`http://127.0.0.1:8000/api/products`)
                .then((response) => {
                    this.products = response.data.results;
                    this.restoreCart(); // Ripristina il carrello dopo aver ottenuto i prodotti
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        addToCart(product) {
            if (this.cart.length > 0 && this.restaurantId !== product.restaurant_id) {
                this.showRestaurantWarning = true;
                return;
            }

            if (this.cart.length === 0) {
                this.restaurantId = product.restaurant_id;
            }

            this.cart.push(product);
            this.saveCart(); // Salva il carrello dopo aver aggiunto un prodotto
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
        this.fetchRestaurantData();
        this.fetchProducts();
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


  
  