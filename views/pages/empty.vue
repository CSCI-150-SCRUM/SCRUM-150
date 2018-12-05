<template>
  <v-responsive>
    <v-container fluid id="box">
      <v-layout>
        <v-flex xs12>
          <v-card id="cards">
              <v-img 
              src="http://www.ashlandcog.com/hp_wordpress/wp-content/uploads/2014/03/coming-soon.png"
              width="350px"
              > 
                <v-container fill-width fluid>
                    <v-layout fill-width> 
                    <v-flex xs12 flexbox>
                    </v-flex>
                    </v-layout>
                </v-container>
              </v-img>
                <div class="d-inline-block align-middle">
                  <v-card-title>
                    <div>
                      <span fill-width class="grey--text">In Progress</span><br>
                      <span>These features will be implemented soon!</span>
                    </div>
                  </v-card-title>
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
      menus: [
        { name: "Login", route: "login" },
        { name: "Register", route: "register" }
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
.v-container{
  text-align: center;
  display: block;
}

#box{
  position:relative;
  overflow: hidden;
}

</style>