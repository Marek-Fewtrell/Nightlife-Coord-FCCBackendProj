<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> Nightlife Coord</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" >Log out </button>
        <button class="btn btn-info log" >Log In</button>
        <router-link to="" class="btn btn-info log">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'app-nav',
  methods: {
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
