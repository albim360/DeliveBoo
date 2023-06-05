<template>
    <div class="cart-container">
        <div class="cart" v-show="cartProducts.length > 0">
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

            <button @click="redirect('/payment')" class="checkout-button"
            >
                Checkout
            </button>
        </div>

        <div v-if="restaurant && restaurant.products.length > 0" class="restaurant"
            :style="getRestaurantBackgroundStyle(restaurant.slug)">
            <h2 class="restaurant-name">
                Ristorante: {{ restaurant.company_name }}
            </h2>
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

                        <button class="add-to-cart-button" @click="addToCart(product), totPayment()">
                            <i class="fas fa-shopping-cart"></i> Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import PaymentPage from './PaymentPage.vue';

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
            cart: [],
            restaurantImages: {
                gambero_rosso: '/images/zia-restaurant.jpg',
                oasis_sapori_antichi: '/images/Oasis.jpg',
            },
            // checkOut:[
            //     {
            //         price: this.totPayment(),
            //         product: this.product
            //     }
            // ],
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
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getRestaurantBackgroundStyle(slug) {
            return {
                background: `url(${this.restaurantImages[slug]})`,
                'background-size': 'cover',
            };
        },
        addToCart(product) {
            if (this.restaurant && product.restaurant_id !== this.restaurant.id) {
                this.showRestaurantWarning = true;
                return;
            }
            this.cart.push(product);
        },
        removeFromCart(product) {
            const index = this.cart.findIndex((p) => p.id === product.id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        calculateTotalPrice() {
            let total = 0;
            for (const product of this.cartProducts) {
                total += product.price * product.quantity;
            }
            return total;
        },
        totPayment() {
            const totalAmount = this.calculateTotalPrice();
            //window.location.href = `http://192.168.0.247:5173/payment?total=${totalAmount}`;
            return totalAmount;
        },
        fetchProducts() {
            axios
                .get(`http://127.0.0.1:8000/api/products`)
                .then((response) => {
                    this.products = response.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        redirect(page) {
            this.$router.push(page);
        }
    },
    created() {
        this.fetchRestaurantData();
        this.fetchProducts();
    }
};
</script>
  
  
<style scoped>
/* Stili precedenti */

.checkout-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

/* Stili successivi */

.cart {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
    float: right;
    background-color: rgba(255, 255, 255, 0.583);

}

.product-description {
    margin-bottom: 5px;
    display: none;
    /* Nasconde la descrizione del prodotto */
}

@media (min-width: 400px) {
    .product-description {
        display: block;
        /* Mostra la descrizione del prodotto quando la larghezza della schermata è almeno 400px */
    }
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 60vh;
    /* Aggiungi altre proprietà CSS per personalizzare l'aspetto dell'immagine di sfondo */
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 100px;
}

.card {
    flex-basis: calc(33.33% - 20px);
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;

    --bs-card-bg: rgba(255, 255, 255, 0.583);
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

.product-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.add-to-cart-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
}

.total-price {
    text-align: right;
    margin-top: 10px;
    font-weight: bold;
}

.restaurant-name {
    color: rgb(233, 233, 240);
    text-align: center;
}

.product-description {
    margin-bottom: 5px;
    display: none;
    /* Nasconde la descrizione del prodotto */
}

@media (min-width: 450px) {
    .product-description {
        display: block;
        /* Mostra la descrizione del prodotto quando la larghezza della schermata è almeno 400px */
    }
}

@media screen and (max-width: 800px) {
    .cart {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .cards {
        padding-top: 50px;
    }

    .card {
        flex-basis: calc(50% - 20px);
    }

    .restaurant {
        height: 50vh;
        /* Imposta l'altezza minima al 100% dell'altezza della viewport */
    }
}

/* Stili per schermi ancora più piccoli */
@media screen and (max-width: 479px) {
    .card {
        flex-basis: 100%;
    }

    .restaurant {
        min-height: 40vh;
        /* Imposta l'altezza minima al 100% dell'altezza della viewport */
    }
}

@media screen and (max-width: 400px) {
    .card {
        flex-basis: 90%;
    }

    .restaurant {
        min-height: 15vh;
        /* Imposta l'altezza minima al 100% dell'altezza della viewport */
    }
}
</style>
  