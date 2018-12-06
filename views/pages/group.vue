<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title>Groups</v-toolbar-title>
                <v-spacer></v-spacer>

                <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn class="primaryText--text" icon slot="activator">
                    <v-icon>control_point</v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <groupAddDialog :rules="rules" @closeAdd="addDialog = false" @alert="alert"></groupAddDialog>
                </v-dialog>
              </v-toolbar>

              <!-- List of groups -->
              <span v-if="groups.length">
                <groupItem
                  v-for="group in groups"
                  :key="group._id"
                  :group="group"
                  @setUpEdit="setupEdit(group)"
                  @setUpDelete="setupDelete(group)"
                ></groupItem>
              </span>
              <v-card v-else class="headline text-xs-center">No groups to show</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <groupDeleteDialog
                  :group="groupToDelete"
                  @closeDelete="deleteDialog = false"
                  @alert="alert"
                ></groupDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->
              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <groupEditDialog
                  :rules="rules"
                  :group="groupToEdit"
                  :editName="editName"
                  @closeEdit="editDialog = false; groupToEdit = {}"
                  @alert="alert"
                ></groupEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js";
import groupItem from "../components/group.vue";
import groupAddDialog from "../components/groupAddDialog.vue";
import groupEditDialog from "../components/groupEditDialog.vue";
import groupDeleteDialog from "../components/groupDeleteDialog.vue";

export default {
  //Variables
  data: () => ({
    errors: [],
    groups: [],
    groupToDelete: {},
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    groupToEdit: {},
    newUser: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: "",
    rules: {
      email: value => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  //Components this page will need
  components: {
    groupItem: groupItem,
    groupAddDialog: groupAddDialog,
    groupEditDialog: groupEditDialog,
    groupDeleteDialog: groupDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all groups from DB, we call this often to make sure the data is up to date
    load() {
      http
        .get("groups")
        .then(response => {
          this.groups = response.data.groups;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(group) {
      this.groupToDelete = group;
      this.deleteDialog = true;
    },

    //opens edit dialog
    setupEdit(group) {
      Object.keys(group).forEach(key => {
        this.groupToEdit[key] = group[key];
      });
      this.editName = group.name;
      this.editDialog = true;
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the
    //resource we are working on
    alert(success, callName, resource) {
      console.log("Page Alerting");
      this.$emit("alert", success, callName, resource);
      this.load();
    }
  },

  //get those groups
  mounted() {
    this.load();
  }
};
</script>