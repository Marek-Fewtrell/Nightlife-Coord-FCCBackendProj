<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Secret Page</h3>
    <hr/>

    <div class="col-sm-12">
      <div class="jumbotron text-center" v-show='isLoggedIn()'>
        <h2>You are successfully authorised and logged in.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav'
import { isLoggedIn } from '../../utils/auth'

export default {
  name: 'SecretPage',
  components: {
    AppNav
  },
  data () {
  },
  methods: {
    isLoggedIn () {
      return isLoggedIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
