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
            <v-responsive>
              <header>
                   <h1 style="font-size:64px">WELCOME TO SCRUMBAG</h1>
              </header>
                  <p style="color:DodgerBlue;">A VISUAL MANAGEMENT TOOL!</p>
                <hr class="my-4">
            <p>
            Welcome to SCRUMBAG. ScrumBag is a web-based application that allows teams to work together using the Scrum Management Technique in 
            a real-time environment. The objective of this application is to simplify the Scrum Management process by incorporating unique user 
            logins, drag-and-drop task cards, and the ability to view, but not modify, other teams' current progress.
           </p>
                 <v-btn variant="primary" href="http://localhost:3001/#/existingProject">Go to existing projects</v-btn>
                 <v-btn variant="success" href="http://localhost:3001/#/boards">Go to project boards</v-btn>
              </v-responsive>
        </template>
    </v-container>
              </v-flex>
</template>

