<template>
  <v-container fluid grid-list-xl>
            <v-card >              
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Tasks </v-toolbar-title>
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

                <!-- List of tasks -->
              <span  v-if="tasks.length">
                <taskItem v-for="tasks in tasks" :key="tasks._id"
                 :tasks="tasks" @setUpEdit="setupEdit(tasks)"
                 @setUpDelete="setupDelete(tasks)">
                 </taskItem>
              </span>
              <v-card v-else class="headline text-xs-center">No tasks to show</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <tasksDeleteDialog :tasks="tasksToDelete" @closeDelete="deleteDialog = false"
                @alert="alert">

                </tasksDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <tasksEditDialog :rules="rules" :tasks="tasksToEdit" :editName="editName"
                @closeEdit="editDialog = false; tasksToEdit = {}" @alert="alert">
                </tasksEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
              
            </v-card>


    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Novel/Story</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
          <v-card-text>Back-Log</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="accent">
          <v-card-text>To-Do</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Doing</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
          <v-card-text>Done</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
  import {mapState} from 'vuex';
  //import taskLane from '../components/taskLane';
  import {http} from "../config/http.js"
  import taskItem from "../components/task.vue"
  import taskAddDialog from "../components/taskAddDialog.vue"
  import taskEditDialog from "../components/taskEditDialog.vue"
  import taskDeleteDialog from "../components/taskDeleteDialog.vue"
  
  export default {
    name: 'board',
  data: () => ({
      errors: [],
      tasks: [],
      tasksToDelete: {},
      alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
      tasksToEdit: {},
      newTasks: {},
      addDialog: false,
      deleteDialog: false,
      editDialog: false,
      editName: ""
    }),

    components: {
      //'task-lane': taskLane,
      taskItem: taskItem,
      taskAddDialog: taskAddDialog,
      taskEditDialog: taskEditDialog,
      taskDeleteDialog: taskDeleteDialog
    },
   // computed: mapState({
   //    todoItems: s => s.items.todo,
   //   inProgressItems: s => s.items.inProgress,
   //   doneItems: s => s.items.done,
   // }),
   
      //The methods we will need
    methods: {
      //load all tasks from DB, we call this often to make sure the data is up to date
      load() {
        http
          .get("tasks")
          .then(response => {
            this.tasks = response.data.tasks;
          })
          .catch(e => {
            this.errors.push(e);
          });
      },
  
      //opens delete dialog
      setupDelete(tasks) {
        this.tasksToDelete = tasks;
        this.deleteDialog = true;
      },
  
      //opens edit dialog
      setupEdit(tasks) {
        Object.keys(tasks).forEach(key => {
          this.tasksToEdit[key] = tasks[key];
        });
        this.editName = tasks.name;
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
  
    //get those taskss
    mounted() {
      this.load();
    },

  
  };
</script>

<style>
  
</style>