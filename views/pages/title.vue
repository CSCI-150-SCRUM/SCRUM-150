<template>
  <v-responsive>
    <v-container fluid>
      <v-layout>
        <v-flex xs4>
          <v-card id="cards">
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
              <v-container fill-width fluid>
                <v-layout fill-width>
                  <v-flex xs12 flexbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-carousel>
              <div class="d-inline-block align-middle">
                  <v-card-title>
                    <div>
                      <span fill-width class="grey--text">Welcome to ScrumBag </span><br>
                      <span>Please login or register to continue</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color = "orange"
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
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
      ],
      menus: [
        { name: "Login", route: "login" },
        { name: "register", route: "register" }
      ]
    }),
  
    //Components this page will need
    components: {
      
    },
  
    //The methods we will need
    methods: {

    }
  };

</script>

<style scoped>
 .v-card{
   text-align: center;
   margin: auto;
   display:block;
   position: relative;
   width: 100%;
   background-attachment: fixed;
   background-size:cover;
 }
 .v-container{
   text-align: center;
   display: block;
 }

</style>