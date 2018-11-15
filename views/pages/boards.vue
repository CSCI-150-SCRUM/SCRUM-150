<template>
  <v-container fluid grid-list-xl>


    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Novel/Story</v-card-text>
        </v-card>
        <draggable>
        <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
        </draggable>  
      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
                                  
              <!-- Begin Toolbar -->
              <v-toolbar class="secondary primaryText--text">
                <v-card-text> Tasks </v-card-text>
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
              <draggable>
                <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
              </draggable>
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <tasksDeleteDialog :task="taskToDelete" @closeDelete="deleteDialog = false"
                @alert="alert">

                </tasksDeleteDialog>
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
      <v-flex xs2>
        <v-card dark color="accent">
          <v-card-text>To-Do</v-card-text>
        </v-card>
        <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>

      </v-flex>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Doing</v-card-text>
        </v-card>
        <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>

      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
          <v-card-text>Done</v-card-text>
        </v-card>
        <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)">
                 </taskItem>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>

      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
  import {http} from "../config/http.js"
  import taskItem from "../components/task.vue"
  import taskAddDialog from "../components/taskAddDialog.vue"
  import taskEditDialog from "../components/taskEditDialog.vue"
  import taskDeleteDialog from "../components/taskDeleteDialog.vue"
//import Axios from 'axios';
  
  export default {
    //Variables
    data: () => ({
      errors: [],
      tasks: [],
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
      //load all tasks from DB, we call this often to make sure the data is up to date
      load() {
        http
          .get("tasks")
          .then(response => {
            this.tasks = response.data.tasks
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
  
    //get those tasks
    mounted() {
      this.load();
    }
  };
</script>