<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> Nightlife Coord</router-link>
      <router-link to="/basic" class="navbar-brand">Basic</router-link>
      <router-link to="/secret" class="navbar-brand" v-show='isLoggedIn()'>Secret</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <router-link to="/login" class="btn btn-info log" v-show="!isLoggedIn()">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn, logout } from '../../utils/auth'
export default {
  name: 'app-nav',
  methods: {
    isLoggedIn () {
      return isLoggedIn()
    },
    handleLogout () {
      return logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
