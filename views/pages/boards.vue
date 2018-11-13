<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 2" :key="`6${i}`" xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 3" :key="`4${i}`" xs4>
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 4" :key="`3${i}`" xs3>
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 6" :key="`2${i}`" xs2>
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 12" :key="`1${i}`" xs1>
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
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