<template>
    <div class="container card my-4">
        <h1>Ricerca Avanzata</h1>
        <div class="row">
            <div class="col-12">
                <label for="rest-name">Nome ristorante</label>
                <input class="name-search" type="text" name="rest-name">
            </div>
        </div>
        <div class="row d-flex card-body">
            <div class="col-4 col-type d-flex flex-column">
                <label for="cook-type">Tipo di cucina</label>
                <!-- da gestire select con api tipology -->
                <select name="cook-type" id="cook-type">
                    <option value="">Seleziona una categoria</option>
                    <option class="text-capitalize" v-for="typology in typologies" :key="typology.slug" :value="typology.id">{{ typology.slug }}
                    </option>
                </select>
            </div>

            <div class="col-4 col-distance d-flex flex-column align-items-center justify-content-center ">
                <label for="distance">Distanza</label>
                <div class="options d-flex flex-column">
                    <ul class="">
                        <li>
                            <input type="radio" name="distance" id="">Entro 1 km
                        </li>
                        <li>
                            <input type="radio" name="distance" id="">Entro 5 km
                        </li>
                        <li>
                            <input type="radio" name="distance" id="">Entro 10 km
                        </li>
                        <li>
                            <input type="radio" name="distance" id="">Entro 20 km
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-4 col-delivery d-flex flex-column">
                <label for="delivery-type">Modalità di consegna</label>
                <!-- da gestire select con api tipology -->
                <select name="delivery-type" id="delivery-type">
                    <option value="Domicilio">Domicilio</option>
                    <option value="Ritiro in negozio">Ritiro in negozio</option>
                    <option value="Take-away">Take-away</option>
                    <option value="Consegna Programmata">Consegna Programmata</option>
                </select>
            </div>

            <div class="row">
                <div class="col-4 col-valutation d-flex flex-column">
                    <label for="valutation">Valutazione</label>
                    <!-- da gestire select con api tipology -->
                    <select name="valutation" id="valutation">
                        <option value="2">2 stelle o più</option>
                        <option value="3">3 stelle o più</option>
                        <option value="4">4 stelle o più</option>
                    </select>
                </div>

                <div class="col-4 d-flex justify-content-evenly">
                    <div class="vegan">
                        <label for="vegan-select">Piatti Vegani</label>
                        <div class="option d-flex gap-2">
                            <input type="radio" name="vegan-select" id="">SI
                        </div>
                        <div class="option d-flex gap-2">
                            <input type="radio" name="vegan-select" id="">NO
                        </div>
                    </div>

                    <div class="gluten">
                        <label for="gluten-select">Glutine</label>
                        <div class="option d-flex gap-2">
                            <input type="radio" name="gluten-select" id="">SI
                        </div>
                        <div class="option d-flex gap-2">
                            <input type="radio" name="gluten-select" id="">NO
                        </div>
                    </div>
                </div>


                <div class="col-4 d-flex flex-column">
                    <label for="price">Prezzo max</label>
                    <input class="max-price" type="text" name="price">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            typologies: [],
        }
    },
    methods: {
        fetchTypologies() {
            axios
                .get('http://127.0.0.1:8000/api/typologies')
                .then(res => {
                    console.log(res.data.results[0].slug); // stampa la risposta dell'API nella console
                    this.typologies = res.data.results;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.fetchTypologies();
        console.log(this.res)
    }
}
</script>

<style lang="scss" scoped>
// .col-type, .col-distance, .col-delivery{
//     display: flex;
// }

.name-search {
    width: 100%;
}
</style>