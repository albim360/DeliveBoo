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
                <div class="col-6 offset-3">
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
                                        <input type="number" id="amount" class="form-control" v-model="total" disabled>
                                    </div>
                                </div>
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
                                    <div id="creditCardNumber" class="form-control">
                                        <img src="data:image/jpeg;base64,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"
                                            alt="Visa" class="credit-card-icon">

                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Expire Date</label>
                                            <div id="expireDate" class="form-control"></div>
                                        </div>
                                        <div class="col-6">
                                            <label>CVV</label>
                                            <div id="cvv" class="form-control"></div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-block" type="submit" :disabled="isProcessing">
                                    <span v-if="isProcessing">
                                        <i class="fa fa-spinner fa-spin"></i> Attendere...
                                    </span>
                                    <span v-else>Paga</span>
                                </button>
                            </form>
                            <div class="alert alert-danger mt-3" v-if="formError">
                                {{ formError }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import braintree from 'braintree-web';
import axios from 'axios';

export default {
    data() {
        return {
            showConfirmation: false,
            showLoader: false,
            hostedFieldInstance: false,
            nonce: "",
            total: 0,
            formError: "",
            isProcessing: false,
            name: "",
            telephone: "",
            date: "",
            address: "",
            email: ""
        };
    },
    mounted() {
        braintree.client.create({
            authorization: "sandbox_s9d8kg26_748b2m3dq2wrsn9n"
        })
            .then(clientInstance => {
                let options = {
                    client: clientInstance,
                    styles: {
                        input: {
                            'font-size': '14px',
                            'font-family': 'Open Sans'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#creditCardNumber',
                            placeholder: 'Enter Credit Card'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: 'Enter CVV'
                        },
                        expirationDate: {
                            selector: '#expireDate',
                            placeholder: '00 / 0000'
                        }
                    }
                };
                return braintree.hostedFields.create(options);
            })
            .then(hostedFieldInstance => {
                this.hostedFieldInstance = hostedFieldInstance;
            })
            .catch(err => {
                console.error(err);
            });
    },
    methods: {
        payWithCreditCard() {
            if (this.hostedFieldInstance) {
                this.formError = ""; // Resetta l'errore del form
                this.isProcessing = true; // Attiva lo stato di elaborazione

                this.hostedFieldInstance.tokenize()
                    .then(payload => {
                        console.log(payload);
                        this.nonce = payload.nonce;
                        console.log(this.nonce);
                        this.confirmPayment();
                    })
                    .catch(err => {
                        console.error(err);
                        this.formError = "Errore durante la generazione del nonce. Riprova.";
                        this.isProcessing = false; // Disattiva lo stato di elaborazione
                    });
            }
        },
        confirmPayment() {
            // Simula l'azione di conferma del pagamento
            this.showLoader = true;

            // Crea un oggetto FormData con i dati del form
            const formData = new FormData();
            formData.append("name", this.name);
            formData.append("telephone", this.telephone);
            formData.append("date", this.date);
            formData.append("address", this.address);
            formData.append("email", this.email);
            formData.append("paymentNonce", this.nonce);
            formData.append("total", this.total);

            
            axios.post("http://127.0.0.1:8000/api/orders", formData)
                .then(response => {
                    console.log("Dati inviati con successo:", response.data);
                    this.showLoader = false;
                    this.showConfirmationPage();
                })
                .catch(error => {
                    console.error("Errore durante l'invio dei dati:", error);
                    this.showLoader = false;
                    this.formError = "Errore durante l'invio dei dati. Riprova.";
                });
        },
        showConfirmationPage() {
            // Mostra la pagina di conferma del pagamento
            this.showConfirmation = true;

            // Mostra l'icona o il logo dell'home page
            console.log("Mostra l'icona o il logo dell'home page.");

            // Dopo un breve ritardo, reindirizza alla home
            setTimeout(() => {
                this.$router.push('/');
            }, 5000);
        }
    },
    created() {
        const params = new URLSearchParams(window.location.search);
        this.total = params.get('total');
    }
};
</script>

<style>
.fa-spinner {
    animation: fa-spin 2s infinite linear;
}

@keyframes fa-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.confirmation-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
}

.confirmation-page h1 {
    font-size: 24px;
}

.loading-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
}

.loader {
    border: 4px solid #f3f3f3;
    /* Colore del bordo */
    border-top: 4px solid #3498db;
    /* Colore del loader */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.credit-card-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
}
</style>

