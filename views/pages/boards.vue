<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-space-around>
      <v-flex d-flex xs12 sm6 md4 lg2>
        <v-card dark>
          <v-toolbar class="secondary primaryText--text">
            <v-card-text>Novel/Story</v-card-text>
          </v-toolbar>
          <!-- <draggable> -->
          <!-- List of novelstory -->
          <span v-if="novelstory.length">
            <draggable v-model="novelstory" :options="{group:'people'}" style="min-height: 10px">
              <novelstoryItem
                v-for="novelstorys in novelstory"
                :key="novelstorys._id"
                :novelstorys="novelstorys"
                @setUpEdit="setupEdit(novelstorys)"
                @setUpDelete="setupDelete(novelstorys)"
              ></novelstoryItem>
            </draggable>
          </span>
          <v-card-text v-else class="grey">No Novel/Storys</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4 lg2>
        <v-card>
          <!-- Begin Toolbar -->
          <v-toolbar class="primary primaryText--text">
            <v-card-text>Backlog</v-card-text>
            <v-spacer></v-spacer>

            <!-- Add Dialog Button -->
            <v-dialog v-model="addDialog" lazy absolute max-width="50%">
              <v-btn class="primaryText--text" icon slot="activator">
                <v-icon>control_point</v-icon>
              </v-btn>

              <!-- Add Dialog -->
              <taskAddDialog :rules="rules" @closeAdd="addDialog = false" @alert="alert"></taskAddDialog>
            </v-dialog>
          </v-toolbar>
          <!-- <draggable> -->
          <!-- List of tasks -->
          <div ondrop="drop(event)" ondragover="allowDrop(event)">
            <span v-if="tasks.length">
              <draggable v-model="tasks" :options="{group:'people'}" style="min-height: 10px">
                <taskItem
                  v-for="task in tasks"
                  :key="task._id"
                  :task="task"
                  @setUpEdit="setupEdit(task)"
                  @setUpDelete="setupDelete(task)"
                  draggable="true"
                  ondragstart="drag(event)"
                ></taskItem>
              </draggable>
            </span>
            <v-card-text v-else class="grey">No Tasks</v-card-text>
          </div>
          <!-- </draggable> -->
          <!-- Begin Delete Dialog -->
          <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
            <taskDeleteDialog
              :task="taskToDelete"
              :deleteName="deleteName"
              @closeDelete="deleteDialog = false"
              @alert="alert"
            ></taskDeleteDialog>
          </v-dialog>
          <!-- End Delete Dialog -->
          <!-- Begin Edit Form -->
          <v-dialog v-model="editDialog" lazy absolute max-width="50%">
            <taskEditDialog
              :rules="rules"
              :task="taskToEdit"
              :editName="editName"
              @closeEdit="editDialog = false; taskToEdit = {}"
              @alert="alert"
            ></taskEditDialog>
          </v-dialog>
          <!-- End Edit Form -->
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4 lg2>
        <v-card dark>
          <v-toolbar class="secondary primaryText--text">
            <v-card-text>To-Do</v-card-text>
          </v-toolbar>
          <!-- List of todo -->
          <span v-if="todo.length">
            <draggable v-model="todo" :options="{group:'people'}" style="min-height: 10px">
              <todoItem
                v-for="todos in todo"
                :key="todos._id"
                :todos="todos"
                @setUpEdit="setupEdit(todos)"
                @setUpDelete="setupDelete(todos)"
              ></todoItem>
            </draggable>
          </span>
          <v-card-text v-else class="grey">No Tasks To-Do</v-card-text>
          <!-- Begin Delete Dialog -->
          <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
            <taskDeleteDialog
              :task="taskToDelete"
              @closeDelete="deleteDialog = false; taskToDelete = {}"
              @alert="alert"
            ></taskDeleteDialog>
          </v-dialog>
          <!-- End Delete Dialog -->
          <!-- Begin Edit Form -->
          <v-dialog v-model="editDialog" lazy absolute max-width="50%">
            <taskEditDialog
              :rules="rules"
              :task="taskToEdit"
              :editName="editName"
              @closeEdit="editDialog = false; taskToEdit = {}"
              @alert="alert"
            ></taskEditDialog>
          </v-dialog>
          <!-- End Edit Form -->
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4 lg2>
        <v-card dark>
          <v-toolbar class="primary primaryText--text">
            <v-card-text>Doing</v-card-text>
          </v-toolbar>
          <!-- List of doing -->
          <span v-if="doing.length">
            <draggable v-model="doing" :options="{group:'people'}" style="min-height: 10px">
              <doingItem
                v-for="doings in doing"
                :key="doings._id"
                :doings="doings"
                @setUpEdit="setupEdit(doings)"
                @setUpDelete="setupDelete(doings)"
              ></doingItem>
            </draggable>
          </span>
          <v-card-text v-else class="grey">No Doing Tasks</v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md4 lg2>
        <v-card dark>
          <v-toolbar class="secondary primaryText--text">
            <v-card-text>Done</v-card-text>
          </v-toolbar>
          <!-- List of done tasks -->
          <span v-if="done.length">
            <draggable v-model="done" :options="{group:'people'}" style="min-height: 10px">
              <doneItem
                v-for="dones in done"
                :key="dones._id"
                :dones="dones"
                @setUpEdit="setupEdit(dones)"
                @setUpDelete="setupDelete(dones)"
              ></doneItem>
            </draggable>
          </span>
          <v-card-text v-else class="grey">No Done Tasks</v-card-text>
          <!-- Begin Delete Dialog -->
          <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
            <taskDeleteDialog
              :task="taskToDelete"
              :deleteName="deleteName"
              @closeDelete="deleteDialog = false"
              @alert="alert"
            ></taskDeleteDialog>
          </v-dialog>
          <!-- End Delete Dialog -->
          <!-- Begin Edit Form -->
          <v-dialog v-model="editDialog" lazy absolute max-width="50%">
            <taskEditDialog
              :rules="rules"
              :task="taskToEdit"
              :editName="editName"
              @closeEdit="editDialog = false; taskToEdit = {}"
              @alert="alert"
            ></taskEditDialog>
          </v-dialog>
          <!-- End Edit Form -->
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import { http } from "../config/http.js";
import taskItem from "../components/task.vue";
import todoItem from "../components/todo.vue";
import doingItem from "../components/doing.vue";
import doneItem from "../components/done.vue";
import novelstoryItem from "../components/novelstory.vue";
import taskAddDialog from "../components/taskAddDialog.vue";
import taskEditDialog from "../components/taskEditDialog.vue";
import taskDeleteDialog from "../components/taskDeleteDialog.vue";
import draggable from "vuedraggable";

//import Axios from 'axios';

export default {
  //Variables
  data: () => ({
    errors: [],
    tasks: [],
    done: [],
    doing: [],
    novelstory: [],
    todo: [],
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
    draggable,
    taskItem: taskItem,
    todoItem: todoItem,
    doingItem: doingItem,
    doneItem: doneItem,
    novelstoryItem: novelstoryItem,
    taskAddDialog: taskAddDialog,
    taskEditDialog: taskEditDialog,
    taskDeleteDialog: taskDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all tasks from DB, we call this often to make sure the data is up to date
    load() {
      http.get("novelstory").then(response => {
        this.novelstory = response.data.novelstory;
      });
      http.get("tasks").then(response => {
        this.tasks = response.data.tasks;
      });
      http.get("doing").then(response => {
        this.doing = response.data.doing;
      });
      http.get("done").then(response => {
        this.done = response.data.done;
      });
      http
        .get("todo")
        .then(response => {
          this.todo = response.data.todo;
        })

        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(task) {
      Object.keys(task).forEach(key => {
        this.taskToDelete[key] = task[key];
      });
      this.deleteName = task.name;
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
      console.log("Page Alerting");
      this.$emit("alert", success, callName, resource);
      this.load();
    }
  },

  //get those tasks
  mounted() {
    this.load();
  }
};
</script>

<style scoped>


</style>