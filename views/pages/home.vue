<template>
  <v-flex>
    <v-container>
      <template>
        <v-responsive>
          <header>
            <h1 style="font-size:64px">WELCOME TO SCRUMBAG</h1>
          </header>
          <p style="color:DodgerBlue;">A VISUAL MANAGEMENT TOOL!</p>
          <hr class="my-4">

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex v-for="item in items" :key="item" xs6 sm4 md3>
                <v-card>
                    <v-icon dark>{{item.icons}}</v-icon>
                    <v-card-title>{{item.titles}}</v-card-title>
                </v-card> 
              </v-flex>
            </v-layout>
          </v-container>
        </v-responsive>
      </template>
    </v-container>
  </v-flex>
</template>

<script>

export default {
    //Variables
    data: () => ({
      items: [
        { icons: "home", titles: "Home" },
        { icons: "settings", titles: "Contacts" },
        { icons: "group", titles: "Settings" },
        { icons: "create_new_folder", titles: "New Project" },
        { icons: "work", titles: "Existing Project" },
        { icons: "event", titles: "Calendar" },
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
  .v-icon{
    font-size: 180px;
  }

  .v-card{
    text-align: center;
    margin: auto;
    display:inline-block;
    background-color: transparent!important;
    border-color: transparent!important;
  }
</style>