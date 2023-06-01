<template>
    <div class="container">
        <div class="col-6 offset-3">
            <div class="card bg-light">
                <div class="card-header">Informazioni sul pagamento</div>
                <div class="card-body">
                    <div class="alert alert-success" v-if="nonce">
                        Successfully generated nonce.
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="amount">Totale</label>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text">€</span></div>
                                <input type="number" id="amount" class="form-control" placeholder="Enter Amount">
                            </div>
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
                        <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Paga stronzo</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import braintree from 'braintree-web';
export default {
    data() {
        return {
            hostedFieldInstance: false,
            nonce: "",
        }
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
                }
                return braintree.hostedFields.create(options)
            })
            .then(hostedFieldInstance => {
                this.hostedFieldInstance = hostedFieldInstance;
            })
            .catch(err => {
            });
    },
    methods: {
        payWithCreditCard() {
            if (this.hostedFieldInstance) {
                this.hostedFieldInstance.tokenize().then(payload => {
                    console.log(payload);
                    this.nonce = payload.nonce;
                    console.log(this.nonce);
                })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
    }
}
</script>
<style>

</style>