<template>
  <v-app
    :dark="isDarkMode"
    style="
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
  "
  >
    <v-navigation-drawer
      v-if="showMenu"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      app
      width="200"
      class="primary"
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          value="true"
          :href="item.href"
          :class="getNavClass(item.href)"
        >
          <v-list-tile-action>
            <v-icon class="primaryText--text" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primaryText--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary primaryText--text" fixed app :clipped-left="clipped" v-if="showMenu">
      <v-toolbar-side-icon class="primaryText--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn class="titleButton" flat :to="{name:title.route}">{{ title.name }}</v-btn>
        </v-toolbar-title>
      <v-spacer></v-spacer>

      <!--      <v-btn @click="isDarkMode = !isDarkMode" icon>
        <v-icon class="primaryText--text" v-if="!isDarkMode">brightness_5</v-icon>
        <v-icon class="primaryText--text" v-else>brightness_3</v-icon>
      </v-btn>-->
    </v-toolbar>

    <main>
      <v-content>
        <v-container fluid>
          <v-layout column align-center>
            <v-fade-transition mode="out-in">
              <router-view @alert="alert"></router-view>
            </v-fade-transition>
          </v-layout>
        </v-container>
      </v-content>
    </main>

    <v-footer app :fixed="fixed" dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-actions class="grey darken-3 justify-center"></v-card-actions>
      </v-card>
    </v-footer>

    <v-snackbar bottom v-model="alertOpen" :color="alertSuccess ? 'success' : 'error'">
      {{ alertString }}
      <v-btn flat color="accent" @click.native="alertOpen = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>



<script>
import login from "./components/login.vue";

export default {
  data: () => {
    return {
      clipped: true,
      drawer: false,
      fixed: false,

      items: [
        {
          icon: "home",
          title: "Home",
          href: "/#/home",
          router: true
        },
        {
          icon: "table_chart",
          title: "Boards",
          href: "/#/boards",
          router: true
        },
        {
          icon: "computer",
          title: "Existing Projects",
          href: "/#/existingProject",
          router: true
        },
        {
          icon: "create_new_folder",
          title: "New Project",
          href: "/#/project",
          router: true
        },
        {
          icon: "event",
          title: "Calendar",
          href: "/#/calendar",
          router: true
        },
        {
          icon: "group",
          title: "Groups",
          href: "/#/group",
          router: true
        }
      ],
      right: true,
      rightDrawer: false,
      title: {name: "ScrumBag", route:"home" },
      alertOpen: false,
      alertString: "",
      alertSuccess: false,
      isDarkMode: true,
      loggedIn: false
    };
  },

  watch: {
    isDarkMode() {
      if (!this.isDarkMode) {
        //NOT dark mode
        this.$vuetify.theme = {
          primary: "#6A1B9A", //Main color
          primaryText: "#FFFFFF", //Color for text on primary
          secondary: "#EF6C00", //Color for active nav
          lightText: "#000000"
        };
      } /* else {
        //Dark mode
        this.$vuetify.theme = {
          primary: "#0D47A1", //Main color
          primaryText: "#FFFFFF", //Color for text on primary
          secondary: "#90CAF9", //Color for active nav
          lightText: "#FFFFFF"
        };
      } */
    }
  },

  methods: {
    alert(success, callName, resource) {
      this.alertOpen = false;
      this.alertString = callName + " " + resource;
      if (success) {
        this.alertSuccess = true;
        this.alertString += " was successful.";
      } else {
        this.alertSuccess = false;
        this.alertString += " has failed.";
      }
      this.alertOpen = true;
    },

    getNavClass(href) {
      if (this.$route.fullPath == href.substring(2)) {
        return "secondary primaryText--text";
      } else {
        return "primary primaryText--text";
      }
    }
  },

  computed: {
    showMenu() {
      return (
        this.$route.name !== "login" &&
        this.$route.name !== "register" &&
        this.$route.name !== "title"
      );
    }
  }
};
</script>

<style>
.titleButton{
  font-size: 20px !important;
  text-transform: none !important;
}

</style>
