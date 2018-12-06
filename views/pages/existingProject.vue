<template>
  <v-container fluid grid-list-md>
    <template>
      <v-layout row wrap justify-space-between>
        <v-flex d-flex xs12 sm6 md4>
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
              <v-btn flat color="orange" variant="success" href="http://localhost:3001/#/boards">Edit Project</v-btn>
              <v-btn flat color="orange">Delete Project</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-card id="cards">
            <v-img
              class="white--text"
              height="200px"
              src="https://tr1.cbsistatic.com/hub/i/2016/08/10/bbb28928-66f8-424d-b56b-8a6f4e0458a8/watson-avatar-video.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Watson</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">Artificial Intelligence </span><br>
                <span>AI developed by Scrumbag and co.</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" variant="success" href="http://localhost:3001/#/boards">Edit Project</v-btn>
              <v-btn flat color="orange">Delete Project</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-card id="cards">
            <v-img
              class="white--text"
              height="200px"
              src="https://boygeniusreport.files.wordpress.com/2015/09/iphone-6-ios-9-1.jpg?quality=98&strip=all&w=782"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">ScrumBag</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">Web Application </span><br>
                <span>Project Management tool created for easier development</span><br>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" variant="success" href="http://localhost:3001/#/boards">Edit Project</v-btn>
              <v-btn flat color="orange">Delete Project</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>

export default {
  //Variables
  data: () => ({
  
  }),

  //Components this page will need
  components: {
 
  },

  //The methods we will need
  methods: {
  
  },

  //get those project
}; 
</script>

<style scoped>
  #cards {
    margin-bottom: 1rem;
  }

  .v-card{
    margin-bottom: 10px;
  }

</style>
