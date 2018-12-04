<template>
  <v-flex>
    <v-container>
      <template>
        <v-responsive>
          <v-card id="cards" width="500px">
            <v-img
              class="white--text"
              width="500px"
              src="https://www.newmiamiblog.com/files/2014/09/Technology.jpg"
            >
              <v-container fill-width fluid>
                <v-layout fill-width>
                  <v-flex xs12 align-end flexbox>
                   <!-- <span style="font-size: 60px" class="headline">SCRUMBAG</span>-->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
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
        </v-responsive>
      </template>
    </v-container>
  </v-flex>
</template>

<script>

export default {
    //Variables
    data: () => ({
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
   display:inline-block;
 }

</style>