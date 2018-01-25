<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Basic Page</h3>
    <hr/>

    <div class="col-sm-12">
      <div class="jumbotron text-center">
        <h2>You are on basic page.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav'

export default {
  name: 'BasicPage',
  components: {
    AppNav
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
