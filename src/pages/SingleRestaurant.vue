<template>
    <div>
        <div class="cart">
            <h3>Carrello</h3>
            <div v-if="showRestaurantWarning" class="alert">
                Impossibile aggiungere il prodotto al carrello. Appartiene a un ristorante diverso.
            </div>

            <ul class="cart-products">
                <li v-for="product in cartProducts" :key="product.id" class="cart-product">
                    <span class="product-info">
                        {{ product.name }} - {{ product.price | currency }} x {{ product.quantity }}
                    </span>
                    <button @click="removeFromCart(product)" class="remove-button">Rimuovi</button>
                </li>
            </ul>
            <p class="total-price">Totale: {{ calculateTotalPrice() | currency }}</p>
        </div>

        <div v-if="restaurant" class="restaurant">
            <h2 class="restaurant-name">Ristorante: {{ restaurant.company_name }}</h2>
            <div class="cards">
                <div class="card" v-for="product in restaurant.products" :key="product.id">
                    <div class="card-content">
                        <div class="product-name">
                            <strong>{{ product.name }}</strong>
                        </div>
                        <div class="product-description">
                            Descrizione: {{ product.description }}
                        </div>
                        <div class="product-price">
                            Prezzo: {{ product.price | currency }}
                        </div>
                        <button class="add-to-cart-button" @click="addToCart(product)">
                            <i class="fas fa-shopping-cart"></i> Aggiungi al carrello
                        </button>
                    </div>
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
.cart {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
}

.alert {
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    margin-top: 10px;
}

.cart-products {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cart-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}

.product-info {
    flex-grow: 1;
}

.remove-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

.restaurant {
    margin-top: 20px;
}

.restaurant-name {
    margin-bottom: 10px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
}

.card {
    flex-basis: calc(33.33% - 20px);
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;
}

.card-content {
    margin-top: 5px;
}

.product-name {
    margin-bottom: 5px;
}

.product-description {
    margin-bottom: 5px;
}

.product-price {
    margin-bottom: 10px;
}

.add-to-cart-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
  


  
  