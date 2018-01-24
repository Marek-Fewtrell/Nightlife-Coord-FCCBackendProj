var app = new Vue({
  el: '#app',
  data: {
    places: [],
    searchString: '',
    loggedIn: false
  },
  created() {
    fetch("/api/places")
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.places = json
      })
  },
  computed: {
    filteredPlaces:function()
    {
        var self=this;
        return this.places.filter(
          function(place) {
            return place.name.toLowerCase().indexOf(self.searchString.toLowerCase())>=0;
          }
        );
    }
  },
  methods: {
    changeGoing: function(placeId) {
      var placesIndex = -1;
      for (var i = 0; i < this.places.length; i++) {
        if (this.places[i].id === placeId) {
          placesIndex = i;
          break;
        }
      }

      this.places[i].going = this.places[i].going ? false : true

    }
  }
});
