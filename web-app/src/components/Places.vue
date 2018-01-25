<template>

  <div class="hello">
    <app-nav></app-nav>
    <h1>{{ msg }}</h1>

    Log In!
    <hr>
    Seach Place Names: <input type='text' v-model="searchString">
    <ul>
      <li v-for="place in filteredPlaces" :key='place.id'>
        <div class="">
          <h3>
            {{ place.name }}
            <!--<button v-on:click="place.going = place.going ? false : true">Going</button>-->
            <button v-on:click="changeGoing(place.id)">Going</button>
          </h3>
          <p>{{ place.description }}</p>
          <p v-if="place.going === true">You are going here</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AppNav from './AppNav'
import { getPlacesApi } from '../../utils/apis'

export default {
  name: 'Places',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'Testing this still',
      places: [],
      searchString: ''
    }
  },
  mounted () {
    console.log('in mounted()')
    this.getPlaces()
  },
  methods: {
    getPlaces () {
      console.log('in getPlaces getting data')
      getPlacesApi().then((places) => {
        console.log('retrieved stuff')
        console.log(places)
        this.places = places
      })
    },
    changeGoing: function (placeId) {
      var placesIndex = -1
      for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].id === placeId) {
          placesIndex = i
          break
        }
      }

      if (this.places[placesIndex].going) {
        this.places[placesIndex].going = false
      } else {
        this.places[placesIndex].going = true
      }
      // this.places[i].going = this.places[i].going ? false : true
    }
  },
  computed: {
    filteredPlaces: function () {
      var self = this
      return this.places.filter(
        function (place) {
          return place.name.toLowerCase().indexOf(self.searchString.toLowerCase()) >= 0
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/

</style>
