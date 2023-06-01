import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPizzaSlice, faBowl, faSushi, faUtensils, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(
  faPizzaSlice,
  faBowl,
  faSushi,
  faUtensils,
  faSearch,
  faInstagram,
  faFacebook,
  faTwitter,
  farStar
);





createApp(App).use(router).mount('#app')
