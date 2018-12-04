<template>
  <v-flex>
    <v-container>
      <template>
        <v-responsive>
          <v-card id="cards">
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vox-cdn.com/thumbor/lGrAB7mbHO_vyqIZ2JFUJB5CesY=/695x110:1920x1080/1200x800/filters:focal(1257x219:1563x525)/cdn.vox-cdn.com/uploads/chorus_image/image/57759253/Fortnite_KeyArt_1080p.0.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Fortnite</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">Video Game Project</span><br>
                <span>Battle Royale game project with a ton of fun dances!</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                v-for="(menu, index) in menus"
                :key="index"
                :to="{name:menu.route}"
              >{{menu.name}}</v-btn>
            </v-card-actions>
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