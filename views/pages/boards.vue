<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout column="sm-4">
          <v-flex>
            <v-card>              
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Tasks </v-toolbar-title>
                <v-spacer></v-spacer>

<!--                   // Add Dialog Button
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn class="primaryText--text" icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  // Add Dialog
                  <tasksAddDialog :rules="rules" @closeAdd="addDialog = false" @alert="alert">
                  </tasksAddDialog>
                </v-dialog>
              </v-toolbar> -->

                <!-- List of tasks -->
              <span  v-if="tasks">
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
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<!--<template>
  <div class="board">
    <div class="column">
        <div class="col-md-4">
          <tasklane id="todo" title="To-Do" :items="todoItems"></tasklane>
        </div>
        <div class="col-md-4">
          <tasklane id="inProgress" title="In progress" :items="inProgressItems"></tasklane>
        </div>
        <div class="col-md-4">
          <tasklane id="done" title="Done" :items="doneItems"></tasklane>
      </div>
    </div>
  </div>
    
  
</template>-->

<script>
import { mapState } from 'vuex';
import { http } from "../config/http.js"
import taskLane from '../components/taskLane';
import taskItem from "../components/task.vue"
import taskAddDialog from "../components/taskAddDialog.vue"
import taskEditDialog from "../components/taskEditDialog.vue"
import taskDeleteDialog from "../components/taskDeleteDialog.vue"

export default {
  name: 'board',
  components: {
    tasklane: taskLane,
    taskItem: taskItem,
    taskAddDialog : taskAddDialog,
    taskDeleteDialog : taskDeleteDialog,
    taskEditDialog : taskEditDialog,
  },
  
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

  //get those tasks
  mounted() {
    this.load();
  },

  computed: mapState({
    todoItems: s => s.items.todo,
    inProgressItems: s => s.items.inProgress,
    doneItems: s => s.items.done,
  }),
};
</script>
<style>
</style>