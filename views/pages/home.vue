<template>
  <v-flex>
    <v-container>
      <template>
        <v-responsive>
          <header>
            <h1 style="font-size:44px" class="text-xs-center">WELCOME TO SCRUMBAG</h1>
          </header>
          <p class="text-xs-center" style="color:DodgerBlue;">A VISUAL MANAGEMENT TOOL!</p>
          <hr class="my-4">

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex v-for="item in items" :key="item" xs6 sm4 md3 lg2>
                <v-card height="200px">
                    <v-icon dark>{{item.icons}}</v-icon>
                    <v-card-text class="text-xs-center">{{item.titles}}</v-card-text>
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
        { icons: "settings", titles: "Settings" },
        { icons: "contacts", titles: "Contacts" },
        { icons: "create_new_folder", titles: "New Project" },
        { icons: "group", titles: "Groups" },
        { icons: "work", titles: "Existing Project" },
        { icons: "event", titles: "Calendar" },
        { icons: "chat", titles: "Chat" },
        { icons: "done", titles: "Completed Project" },
        { icons: "help", titles: "Help" }
        
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
    font-size: 150px;
  }

  .v-card{
    text-align: center;
    margin: auto;
    display:block;
    background-color: transparent!important;
    border-color: transparent!important;
  }
</style>