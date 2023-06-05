<template>
    <div>
        <div v-if="showConfirmation" class="confirmation-page">
            <!-- Pagina di conferma del pagamento -->
            <a class="navbar-brand" href="/">
                <img src="images/logoprova.png" alt="Logo" class="logo">
            </a>
            <h1>Pagamento confermato</h1>
            <!-- Inserisci qui il tuo logo o icona dell'home page -->
        </div>
        <div v-else-if="showLoader" class="loading-page">
            <!-- Pagina di attesa con sfondo bianco e buffer circolare -->
            <div class="loader"></div>
        </div>
        <div v-else>
            <div class="container">
 FEAT-form-order
                <div class="col-6 offset-3">
                    <div class="card bg-light">
                        <div class="card-header">Informazioni sul pagamento</div>
                        <div class="card-body">
                            <div class="alert alert-success" v-if="nonce">
                                Successfully generated nonce.
                            </div>
                            <form @submit.prevent="payWithCreditCard">
                                <div class="form-group">
                                    <label for="amount">Totale {{ store.price }}</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">€</span>
                                        </div>
                                        <input type="number" id="amount" class="form-control" v-model="total" disabled>
                                    </div>

                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="card bg-light">
                            <div class="card-header">Informazioni sul pagamento</div>
                            <div class="card-body">
                                <div class="alert alert-success" v-if="nonce">
                                    Successfully generated nonce.

                                </div>
                                <form @submit.prevent="payWithCreditCard">
                                    <div class="form-group">
                                        <label for="amount">Totale</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">€</span>
                                            </div>
                                            <input type="number" id="amount" class="form-control"
                                                :value="parseFloat(total) + 1" disabled>
                                        </div>
                                    </div>
 FEAT-form-order
                                </div>
                                <button class="btn btn-primary btn-block" type="submit" :disabled="isProcessing">
                                    <span v-if="isProcessing">
                                        <i class="fa fa-spinner fa-spin"></i> Attendere...
                                    </span>
                                    <span v-else>Paga</span>
                                </button>
                                <h1> prova{{ price }}</h1>
                            </form>
                            <div class="alert alert-danger mt-3" v-if="formError">
                                {{ formError }}

                                    <div class="form-group">
                                        <label for="name">Nome</label>
                                        <input type="text" id="name" class="form-control" v-model="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="telephone">Telefono</label>
                                        <input type="tel" id="telephone" class="form-control" v-model="telephone">
                                    </div>
                                    <div class="form-group">
                                        <label for="date">Data</label>
                                        <input type="date" id="date" class="form-control" v-model="date">
                                    </div>
                                    <div class="form-group">
                                        <label for="address">Indirizzo</label>
                                        <input type="text" id="address" class="form-control" v-model="address">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" class="form-control" v-model="email">
                                    </div>
                                    <hr />
                                    <div class="form-group">
                                        <label>Numero carta di credito</label>
                                        <div id="creditCardNumber" class="form-control" maxlength="16" contenteditable="true"></div>
                                      </div>
                                      
                                    <div class="form-group">
                                        <label for="cvv">CVV</label>
                                        <input type="number" id="cvv" maxlength="3" class="form-control" v-model="cvv">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Paga</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
 FEAT-form-order
import braintree from 'braintree-web';
import store from '../store'

export default {
    data() {
        return {
            store,
            showConfirmation: false,
            showLoader: false,
            hostedFieldInstance: false,
            nonce: "",

export default {
    data() {
        return {

            total: 0,
            name: '',
            telephone: '',
            date: '',
            address: '',
            email: '',
            cvv: '',
            showLoader: false,
            showConfirmation: false,
            nonce: '',
        };
    },
    created() {
        // Ottieni il valore del parametro 'total' dall'URL
        const urlParams = new URLSearchParams(window.location.search);
        this.total = parseInt(urlParams.get('total')) || 0;
    },

    methods: {
        payWithCreditCard() {
            this.showLoader = true;
            // Simulazione di una chiamata asincrona
            setTimeout(() => {
                this.showLoader = false;
                this.showConfirmation = true;
            }, 2000);
        },
    },
};
</script>
  
<style scoped>
/* Stili personalizzati per la pagina */
.container {
    padding-top: 50px;
}

.card {
    margin-top: 30px;
}

.card-header {
    background-color: #f2f2f2;
}

.alert-success {
    margin-top: 20px;
}

.logo {
    width: 150px;
}

.loading-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loader {
    border: 8px solid #f3f3f3;
    /* grigio chiaro */
    border-top: 8px solid #3498db;
    /* blu */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>
  