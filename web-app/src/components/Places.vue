<template>

  <div class="hello">
    <app-nav></app-nav>
    <h1>{{ msg }}</h1>
    <hr>

    Seach Place Names: <input type='text' v-model="searchString">
    <p v-show="!isLoggedIn()">Log in to indicate where you are going.</p>
    <div class="holder">
      <div v-for="place in filteredPlaces" :key='place.id'>
        <div class="">
          <h3>
            {{ place.name }}
            <!--<button v-on:click="place.going = place.going ? false : true">Going</button>-->
            <button v-on:click="changeGoing(place.id)"> <span v-if="place.going">Stop Going</span><span v-else>Going</span> </button>
          </h3>
          <p>{{ place.description }}</p>
          <p v-if="place.going == true">You are going here</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AppNav from './AppNav'
import { isLoggedIn, getAccessToken } from '../../utils/auth'
import { getPlacesApi, putAttendanceApi } from '../../utils/apis'

export default {
  name: 'Places',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'Nightlife Places',
      places: []
    }
  },
  mounted () {
    console.log('in mounted()')
    this.getPlaces()
  },
  methods: {
    isLoggedIn () {
      return isLoggedIn()
    },
    getPlaces () {
      console.log('in getPlaces getting data')
      getPlacesApi().then((places) => {
        console.log('retrieved stuff')
        console.log(places)
        this.places = places
      })
    },
    changeGoing: function (placeId) {
      if (!isLoggedIn()) {
        if (this.searchString === '') {
          this.$router.push({ path: 'Login' })
        } else {
          this.$router.push({ path: 'Login', query: { search: this.searchString } })
        }
        return
      }
      var placesIndex = -1
      for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].id === placeId) {
          placesIndex = i
          break
        }
      }
      var userAttendance = false
      if (this.places[placesIndex].going) {
        userAttendance = false
      } else {
        userAttendance = true
      }
      putAttendanceApi(placeId, getAccessToken(), userAttendance).then((result) => {
        console.log('putAttendanceApi result')
        console.log(result)
      })

      if (this.places[placesIndex].going) {
        this.places[placesIndex].going = false
      } else {
        this.places[placesIndex].going = true
      }
      // this.places[i].going = this.places[i].going ? false : true
    }
  },
  computed: {
    searchString: {
      get: function () {
        return this.$store.getters.searchString
      },
      set: function (newValue) {
        this.$store.commit('update', newValue)
      }
    },
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
