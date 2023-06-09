import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUtensils, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';


library.add(faUtensils, faSearch, faInstagram, faFacebook, faTwitter, farStar, faBars);


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
