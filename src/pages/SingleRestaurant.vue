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
        <p class="total-price">Totale: {{ calculateTotalPrice() | currency }} &euro;</p>
  
        <button @click="goToPaymentPage" class="checkout-button">Checkout</button>
      </div>
  
      <div v-if="restaurant && restaurant.products.length > 0" class="restaurant" :style="getRestaurantBackgroundStyle(restaurant.slug)">
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
                Prezzo: {{ product.price | currency }} &euro;
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
        cart: [],
        restaurantImages: {
          gambero_rosso: '/images/zia-restaurant.jpg',
          oasis_sapori_antichi: '/images/Oasis.jpg',
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
      goToPaymentPage() {
        const totalAmount = this.calculateTotalPrice();
        window.location.href = `http://127.0.0.1:5173/payment?total=${totalAmount}`;
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
    },
    created() {
      this.fetchRestaurantData();
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  template{
    background: repeating-linear-gradient(45deg, #e66465, #e66465 10px, #9198e5 10px, #9198e5 20px);

  }
  .cart-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  
  .cart {
    order: 1;
    flex: 1 1 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .cart h3 {
    font-size: 24px;
    margin-top: 0;
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
    margin-bottom: 10px;
  }
  
  .product-info {
    flex-grow: 1;
  }
  
  .remove-button {
    background-color: #d32f2f;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .remove-button:hover {
    background-color: #c82333;
  }
  
  .total-price {
    text-align: right;
    margin-top: 10px;
    font-weight: bold;
    font-size: 18px;
  }
  
  .checkout-button {
    background-color: #01e064;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .checkout-button:hover {
    background-color: #218838;
  }
  
  .restaurant {
    flex: 1 1 300px;
    /* margin-top: 20px; */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 60vh;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .restaurant-name {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 10px;
    margin: 0;
    font-size: 24px;
  }
  
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  
  .card {
    flex: 1 1 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .product-name {
    font-size: 20px;
  }
  
  .product-description {
    color: #666;
  }
  
  .product-price {
    font-weight: bold;
  }
  
  .add-to-cart-button {
    background-color: #01e064;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    max-width: max-content;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .add-to-cart-button:hover {
    background-color: #229355;
  }
  
  @media screen and (max-width: 768px) {
    .cart {
      flex: 1 1 100%;
      margin-bottom: 20px;
    }
  
    .restaurant {
      flex: 1 1 100%;
    }
  
    .cards {
      justify-content: flex-start;
    }
  
    .card {
      flex: 1 1 100%;
    }
  }
  </style>
  