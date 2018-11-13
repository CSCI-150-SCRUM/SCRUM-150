<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>              
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> New task </v-toolbar-title>
                <v-spacer></v-spacer>

                  <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn class="primaryText--text" icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <taskAddDialog :rules="rules" @closeAdd="addDialog = false" @alert="alert">
                  </taskAddDialog>
                </v-dialog> 
              </v-toolbar>

               <!-- List of task -->
              <span  v-if="task">
                <taskItem v-for="task in task" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card v-else class="headline text-xs-center">No tasks to show</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <taskDeleteDialog :task="taskToDelete" @closeDelete="deleteDialog = false"
                @alert="alert">

                </taskDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <taskEditDialog :rules="rules" :task="taskToEdit" :editName="editName"
                @closeEdit="editDialog = false; taskToEdit = {}" @alert="alert">
                </taskEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
               
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js"
import taskItem from "../components/task.vue"
import taskAddDialog from "../components/taskAddDialog.vue"
import taskEditDialog from "../components/taskEditDialog.vue"
import taskDeleteDialog from "../components/taskDeleteDialog.vue"

export default {
  //Variables
  data: () => ({
    errors: [],
    task: [],
    taskToDelete: {},
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    taskToEdit: {},
    newtask: {},
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
    taskItem: taskItem,
    taskAddDialog: taskAddDialog,
    taskEditDialog: taskEditDialog,
    taskDeleteDialog: taskDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all task from DB, we call this often to make sure the data is up to date
    load() {
      http
        .get("task")
        .then(response => {
          this.task = response.data.task;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(task) {
      this.taskToDelete = task;
      this.deleteDialog = true;
    },

    //opens edit dialog
    setupEdit(task) {
      Object.keys(task).forEach(key => {
        this.taskToEdit[key] = task[key];
      });
      this.editName = task.name;
      this.editDialog = true;
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the 
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
      this.load()
    }
  },

  //get those task
  mounted() {
    this.load();
  }
};
</script>
