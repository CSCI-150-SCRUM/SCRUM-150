<template>
  <v-responsive>
    <v-container fluid id="box">
      <v-layout>
        <v-flex xs12>
          <v-card id="cards">
            <v-carousel>
              <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
              <v-container fill-width fill-height fluid>
                <v-layout fill-height fill-width>
                  <v-flex xs12 flexbox></v-flex>
                </v-layout>
              </v-container>
            </v-carousel>
            <div class="d-inline-block align-middle">
              <v-card-title>
                <div>
                  <span fill-width class="grey--text">Welcome to ScrumBag</span>
                  <br>
                  <span>Please login or register to continue</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  large
                  color="orange"
                  fill-width
                  flat
                  v-for="(menu, index) in menus"
                  :key="index"
                  :to="{name:menu.route}"
                >{{menu.name}}</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  //Variables
  data: () => ({
    items: [
      {
        src: "https://www.newmiamiblog.com/files/2014/09/Technology.jpg"
      },
      {
        src: "https://wallpapercave.com/wp/vo32bd8.jpg"
      },
      {
        src:
          "https://images.pexels.com/photos/247791/pexels-photo-247791.png?cs=srgb&dl=ai-codes-coding-247791.jpg&fm=jpg"
      },
      {
        src:
          "http://mobility.exchange/wp-content/uploads/2018/01/mobile-device-technology-wallpaper.jpg"
      }
    ],
    menus: [
      { name: "Login", route: "login" },
      { name: "register", route: "register" }
    ]
  }),

  //Components this page will need
  components: {},

  //The methods we will need
  methods: {}
};
</script>

<style scoped>
.v-card {
  text-align: center;
  margin: auto;
  display: inline-block;
  background-size: cover;
  height: auto;
  width: 100%;
}
.v-container {
  text-align: center;
  display: block;
}

.v-carousel-item {
  width: 100%;
  height: auto;
}

#box {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>