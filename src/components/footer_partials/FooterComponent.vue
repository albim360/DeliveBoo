<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 class="footer-title">Deliveboo</h5>
          <p class="footer-description">Un modo semplice per ordinare il tuo cibo preferito a domicilio.</p>
          <div class="footer-social">
            <a href="#" class="social-icon">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a href="#" class="social-icon">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" class="social-icon">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </div>
        </div>
        <div class="col-md-3">
          <h5 class="footer-title">Gira il mondo con le nostre categorie</h5>
          <router-link to="/advanced-search" class="footer-link">Scopri di più</router-link>
        </div>
        <div class="col-md-3">
          <h5 class="footer-title">Contatti</h5>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Assistenza</a></li>
            <li><a href="#" class="footer-link">Termini e condizioni</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
          </ul>
        </div>
      </div>
      <hr class="footer-divider">
      <div class="text-center">
        <p class="footer-copyright">
          &copy; {{ currentYear }} Deliveboo. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF, faInstagram, faTwitter);

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.footer {
  padding: 40px 0;
  background-color: #ff6600;
}

.footer-title {
  font-weight: bold;
  color: #483434;
}

.footer-description {
  color: #fff;
}

.footer-social {
  margin-top: 10px;
}

.social-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
  color: #ff6600;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
  background-color: #dcdcdc;
  color: #fff;
}

.footer-links {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #dcdcdc;
}

.footer-divider {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #ccc;
}

.footer-copyright {
  color: #fff;
}
</style>
