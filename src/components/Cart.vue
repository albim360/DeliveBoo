<template>
    <div class="d-flex cart-outer-div">
        <div class="cart-body">
            <div v-if="totalPrice !== 0" class="container mb-5">
                <h4 class="my-4 my-cart">My Cart</h4>
                <div>
                    <h4>Summary</h4>
                    <h4>Cart</h4>
                </div>
                <div class="d-flex">
                    <Summary :totalPrice="totalPrice" />
                    <div class="row">
                        <div>
                            <ul>
                                <li v-for="product in cartItems" :key="product.id">
                                    <h6>{{ product.name }}</h6>
                                    <div class="cart-items">
                                        <div class="d-flex">
                                            <button @click="addItem(product)" class="add" type="button">-</button>
                                            <span class="cart-quantity">{{ product.quantity }}</span>
                                            <button @click="removeItem(product)" class="remove" type="button">+</button>
                                        </div>
                                        <h6>{{ product.price }}</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="checkout" type="button">Checkout</button>
                </div>
            </div>
            <EmptyCart v-else />
        </div>
    </div>
</template>
  
<script>
import EmptyCart from "./EmptyCart";
import Summary from "./Summary";

export default {
    name: "Cart",
    components: {
        EmptyCart,
        Summary
    },
    data() {
        return {
            cartItems: [], // Array di oggetti dei prodotti nel carrello
            totalPrice: 0 // Prezzo totale del carrello
        };
    },
    methods: {
        addItem(product) {
            // Aggiungi il prodotto all'array cartItems
            this.cartItems.push(product);
            // Aggiorna il prezzo totale
            this.totalPrice += product.price;
        },
        removeItem(product) {
            // Rimuovi il prodotto dall'array cartItems
            const index = this.cartItems.findIndex(item => item.id === product.id);
            if (index !== -1) {
                this.cartItems.splice(index, 1);
                // Aggiorna il prezzo totale
                this.totalPrice -= product.price;
            }
        },]
        checkout() {
            swal("Good Job!", "Your order is placed successfully!", "success").then(() => {
                window.location.href = "/cart";
            });
        }
    }
};
</script>
  