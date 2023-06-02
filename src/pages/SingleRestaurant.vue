<template>
    <div>
        <div class="cart" v-show="showCart">
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

        <div v-if="restaurant" class="restaurant"
            :style="{ backgroundImage: `url(${getRestaurantImage(restaurant.slug)})`, height: '700px', backgroundSize: 'cover' }">

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
            cart: [],
            restaurantId: null,
            showCart: false,
            showRestaurantWarning: false,
            restaurantImages: {
                gambero_rosso: '/images/zia-restaurant.jpg',
                oasis_sapori_antichi: '/images/Oasis.jpg'
                // oasis_sapori_antihci: '/images/'


            },

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

            this.showCart = true;
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
        getProductImage(productName) {
            const product = this.products.find(p => p.name === productName);
            if (product) {
                const slug = product.slug;
                return this.productImages[slug];
            }
            return ''; // Restituisci una stringa vuota se l'immagine non è trovata
        },

        getRestaurantImage(slug) {
            return this.restaurantImages[slug];
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
    border: 1px solid #dfd6d6fe;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
    float: right;
    width: 250px;
    background-color: rgb(203, 133, 14);
    float: right;
    width: 250px;
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
    background-color: #ff660063;
}

@media screen and (min-width: 768px) {
    .cart {
        width: 350px;
    }

    .cards {
        justify-content: space-around;
    }

    .card {
        flex-basis: calc(25% - 20px);
    }
}

/* Stili per schermi più piccoli */
@media screen and (max-width: 767px) {
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
}

/* Stili per schermi ancora più piccoli */
@media screen and (max-width: 479px) {
    .card {
        flex-basis: 100%;
    }
}

@media screen and (max-width: 400px) {
    .card {
        flex-basis: 90%;

    }

    .product-description {
        display: none;
    }
}
</style>



  


  
  