<!-- PaymentPage.vue -->
<template>
    <div>
        <!-- ... contenuto della pagina di pagamento ... -->

        <h2>Carrello</h2>
        <ul>
            <li v-for="product in cart" :key="product.id">
                {{ product.name }} - {{ product.price | currency }}
                <button @click="removeFromCart(product)">Rimuovi</button>
            </li>
        </ul>
        <p>Totale: {{ calculateTotalPrice() | currency }}</p>
    </div>
</template>
  
<script>
import { ref } from "vue";
import CartPage from "./CartPage.vue";

export default {
    components: {
        CartPage,
    },
    setup() {
        const cart = ref([]);

        function removeFromCart(product) {
            // implementa la logica per rimuovere dal carrello
        }

        function calculateTotalPrice() {
            // implementa la logica per calcolare il totale del carrello
        }

        return {
            cart,
            removeFromCart,
            calculateTotalPrice,
        };
    },
};
</script>