import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';

Vue.component('b-jumbotron', bJumbotron);

<template>
    <v-flex>
    <v-container>
      <template>
<<<<<<< HEAD
          <v-layout row>
            <v-flex>
              <v-card>
                <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Welcome to ScrumBag </v-toolbar-title>
                </v-toolbar>
                <v-container fluid>
                  <v-card-text>
                    This is where we will have our main module.
                  </v-card-text>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
      </template>
=======
            <v-jumbotron>
              <header>
                   <h1 style="font-size:64px">WELCOME TO SCRUMBAG</h1>
              </header>
                  <p style="color:DodgerBlue;">A VISUAL MANAGEMENT TOOL!</p>
                <hr class="my-4">
            <p>
            Welcome to SCRUMBAG. ScrumBag is a web-based application that allows teams to work together using the Scrum Management Technique in a real-time environment. The objective of this application is to simplify the Scrum Management process by incorporating unique user logins, drag-and-drop task cards, and the ability to view, but not modify, other teams' current progress. This wiki will further detail how the application will be implemented and the features that will be included.
           </p>
                 <v-btn variant="primary" href="http://localhost:3000/#/existingProject">Go to existing projects</v-btn>
                 <v-btn variant="success" href="http://localhost:3000/#/boards">Go to project boards</v-btn>
              </v-jumbotron>
        </template>
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887
    </v-container>
              </v-flex>
</template>

<script>
export default {
  data: () => ({
    value: "",
    num1: 0,
    num2: 0
  })

}
</script>

<style>

</style>
