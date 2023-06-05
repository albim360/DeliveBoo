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
                                            <span class="input-group-text">€ {{ store.total }}</span>
                                        </div>
                                        <input type="number" id="amount" class="form-control d-none" v-model="total" disabled>
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
                                <!-- <div class="form-group">
                                    <label for="date">Data</label>
                                    <input type="date" id="date" class="form-control" v-model="date">
                                </div> -->
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
                                    <div id="creditCardNumber" class="form-control"></div>
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
                                <button class="btn btn-success"  @click="confirmPayment()">okok</button>
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
import store from '../store'
import { DateTime } from "luxon";

export default {
    data() {
        return {
            store,
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
            //let formData = new FormData();
            //formData.append("name", this.name);
            //formData.append("telephone", this.telephone);
            //formData.append("date", '2023-06-02 12:34:56');
            //formData.append("address", this.address);
            //formData.append("email", this.email);
            //formData.append("total", this.total);
            //formData.append("prod", store.products);
            let dati = {
                name: this.name,
                telephone: this.telephone,
                date: '2023-06-02 12:34:56',
                address: this.address,
                email: this.email,
                prod: store.products,
                total_payment: store.total,
            }
            
            axios.post("http://127.0.0.1:8000/api/orders", dati)
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
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
}

.card-header {
  padding: 10px;
  background-color: #f8f8f8;
  color: #333;
  border-bottom: 1px solid #ccc;
}

.card-body {
  padding: 20px;
}

.alert-success {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.input-group-text {
  background-color: #f8f8f8;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #2186c4;
  border-color: #2186c4;
}

.btn-primary:disabled,
.btn-primary:disabled:hover {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.alert-danger {
  margin-top: 20px;
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
</style>
