
<template>
  <div>
    <app-nav></app-nav>
    <!--<h3 class="text-center" v:model=''>Login/Register</h3>
    <hr/>-->

    <div class="col-sm-12" v-if="!isLoggedIn()">

      <div class="jumbotron text-center">
        <ul class="form-switcher">
          <li v-on:click.prevent= "flip('register')"><a href="" id="register-form">Register</a></li>
          <li v-on:click.prevent= "flip('login')"><a href="" id="login-form">Login</a></li>
        </ul>

        <div class="form-register" id="form-register">
          <h2>Test</h2>
          <div class="error-message" v-text="registerError"></div>
          <input type="text" name="username" placeholder="Username" v-model="registerUsername">
          <input type="password" name="password" placeholder="Password" v-model="registerPassword">
          <input type="password" name="passwordconfirm" placeholder="Password Confirm" v-model="registerPasswordConfirm">
          <input type="submit" v-on:click="submit('register')" v-model="registerSubmit" id="registerSubmit">
          <div class="links">
            <a href="" v-on:click="flip('login', $event)">Already have an account?</a>
          </div>
        </div>
        <div class="form-login active" id="form-login">
          <h2>Test 2</h2>
          <div class="error-message" v-text="loginError"></div>
          <input type="text" name="username" placeholder="Username" v-model="loginUsername">
          <input type="password" name="password" placeholder="Password" v-model="loginPassword">
          <input type="submit" v-on:click="submit('login')" v-model="loginSubmit"  id="loginSubmit">
          <div class="links">
            <a href="" v-on:click="flip('password', $event)">Forgot your password?</a>
          </div>
        </div>
        <div class="form-password" id="form-password">
        </div>
      </div>
    </div>
    <div class="jumbotron text-center" v-else>
      <h2>You have already logged in.</h2>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav'
import { isLoggedIn, loginCreds, register } from '../../utils/auth'

var modalSubmitRegister = 'Register'
var modalSubmitPassword = 'Reset Password'
var modalSubmitLogin = 'Login'
export default {
  name: 'loginPage',
  components: {
    AppNav
  },
  data () {
    return {
      active: 'login',

      // Submit button text
      registerSubmit: modalSubmitRegister,
      passwordSubmit: modalSubmitPassword,
      loginSubmit: modalSubmitLogin,

      // Modal text fields
      registerUsername: '',
      registerPassword: '',
      registerPasswordConfirm: '',
      loginUsername: '',
      loginPassword: '',
      passwordEmail: '',

      // Modal error messages
      registerError: '',
      loginError: '',
      passwordError: ''
    }
  },
  methods: {
    isLoggedIn () {
      return isLoggedIn()
    },
    submit: function (which) {
      var credentials = {
        username: null,
        password: null
      }
      if (which === 'login') {
        credentials = {
          username: this.loginUsername,
          password: this.loginPassword
        }
        loginCreds(credentials)
        // this.$router.push('/')
      } else if (which === 'register') {
        if (this.registerPassword === this.registerPasswordConfirm) {
          credentials = {
            username: this.registerUsername,
            password: this.registerPassword
          }
          register(credentials)
        }
      }
    },
    flip: function (which) {
      if (which !== this.active) {
        document.getElementById('form-' + this.active).classList.remove('active')
        document.getElementById('form-' + which).classList.add('active')
        document.getElementById(which + '-form').classList.add('active')
        document.getElementById(this.active + '-form').classList.remove('active')

        this.active = which
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.form-switcher {
margin: 0;
padding: 0;
}

ul.form-switcher li {
  list-style: none;
  display: inline-block;
  width: 50%;
  float: left;
  margin: 0;
}

ul.form-switcher li a {
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  color: #666666;
  background-color: #dddddd;
  text-align: center;
}

ul.form-switcher li a.active {
  color: #000000;
  background-color: #f6f6f6;
}

.form-login,
.form-register,
.form-password {
  padding: 75px 25px 25px;
  display: none;
}

.form-login.active,
.form-register.active,
.form-password.active {
  display: block;
}

</style>
