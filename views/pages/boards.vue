<template>
  <v-container fluid grid-list-xl>
   

    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Novel/Story</v-card-text>
        </v-card>
        <!-- <draggable> -->
        <div ondrop="drop(event)" ondragover="allowDrop(event)">
              <span  v-if="novelstories.length">
                <draggable v-model="novelstories" :options="{group:'people'}" style="min-height: 10px">

                <doneItem v-for="novel in novelstories" :key="novel._id"
                 :novel="novel" @setUpEdit="setupNovelEdit(novel)"
                 @setUpDelete="setupNovelDelete(novel)" draggable="true" ondragstart="drag(event)">
                 </novelItem>
                </draggable>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
            </div>
              <!-- </draggable> -->
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <novelDeleteDialog :novel="novelToDelete" :deleteName="deleteName" @closeDelete="deleteDialog = false; novelToDelete={}"
                @alert="alert">

                </novelDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <novelEditDialog :rules="rules" :novel="novelToEdit" :editName="editName"
                @closeEdit="editDialog = false; novelToEdit = {}" @alert="alert">
                </novelEditDialog>
              </v-dialog>
              <!-- End Edit Form --> 
      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
                                  
              <!-- Begin Toolbar -->
              <v-toolbar class="secondary primaryText--text">
                <v-card-text> Backlog </v-card-text>
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
             <!-- <draggable> -->
                <!-- List of tasks -->
            <div ondrop="drop(event)" ondragover="allowDrop(event)">
              <span  v-if="tasks.length">
                <draggable v-model="tasks" :options="{group:'people'}" style="min-height: 10px">

                <taskItem v-for="task in tasks" :key="task._id"
                 :task="task" @setUpEdit="setupEdit(task)"
                 @setUpDelete="setupDelete(task)" draggable="true" ondragstart="drag(event)">
                 </taskItem>
                </draggable>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
            </div>
             <!-- </draggable> -->
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <taskDeleteDialog :task="taskToDelete" :deleteName="deleteName" @closeDelete="deleteDialog = false; taskToDelete={}"
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
      <v-flex xs2>
        <v-card dark color="accent">
          <v-card-text>To-Do</v-card-text>
        </v-card>
        <div ondrop="drop(event)" ondragover="allowDrop(event)">
              <span  v-if="todos.length">
                <draggable v-model="todos" :options="{group:'people'}" style="min-height: 10px">

                <todoItem v-for="todo in todos" :key="todo._id"
                 :todo="todo" @setUpEdit="setupTodoEdit(todo)"
                 @setUpDelete="setupTodoDelete(todo)" draggable="true" ondragstart="drag(event)">
                 </todoItem>
                </draggable>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
            </div>
              <!-- </draggable> -->
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <todoDeleteDialog :todo="todoToDelete" :deleteName="deleteName" @closeDelete="deleteDialog = false; todoToDelete={}"
                @alert="alert">

                </todoDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <todoEditDialog :rules="rules" :todo="todoToEdit" :editName="editName"
                @closeEdit="editDialog = false; todoToEdit = {}" @alert="alert">
                </todoEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
      </v-flex>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>Doing</v-card-text>
        </v-card>
        <!-- List of doing -->
            <div ondrop="drop(event)" ondragover="allowDrop(event)">
              <span  v-if="doings.length">
                <draggable v-model="doings" :options="{group:'people'}" style="min-height: 10px">

                <doingItem v-for="doing in doings" :key="doing._id"
                 :doing="doing" @setUpEdit="setupDoingEdit(done)"
                 @setUpDelete="setupDoingDelete(done)" draggable="true" ondragstart="drag(event)">
                 </doingItem>
                </draggable>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
            </div>
              <!-- </draggable> -->
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <doingDeleteDialog :doing="doingToDelete" :deleteName="deleteName" @closeDelete="deleteDialog = false; doingToDelete={}"
                @alert="alert">

                </doingDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <doingEditDialog :rules="rules" :doing="doingToEdit" :editName="editName"
                @closeEdit="editDialog = false; doingToEdit = {}" @alert="alert">
                </doingEditDialog>
              </v-dialog>
              <!-- End Edit Form -->

      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
          <v-card-text>Done</v-card-text>
        </v-card>
        <!-- List of done tasks -->
               <!-- List of tasks -->
            <div ondrop="drop(event)" ondragover="allowDrop(event)">
              <span  v-if="dones.length">
                <draggable v-model="dones" :options="{group:'people'}" style="min-height: 10px">

                <doneItem v-for="done in dones" :key="done._id"
                 :done="done" @setUpEdit="setupDoneEdit(done)"
                 @setUpDelete="setupDoneDelete(done)" draggable="true" ondragstart="drag(event)">
                 </doneItem>
                </draggable>
              </span>
              <v-card-text v-else class="grey">No Tasks</v-card-text>
            </div>
              <!-- </draggable> -->
              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <doneDeleteDialog :done="doneToDelete" :deleteName="deleteName" @closeDelete="deleteDialog = false; doneToDelete={}"
                @alert="alert">

                </doneDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <doneEditDialog :rules="rules" :done="doneToEdit" :editName="editName"
                @closeEdit="editDialog = false; doneToEdit = {}" @alert="alert">
                </doneEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import { http } from '../config/http.js';
import taskItem from '../components/task.vue';
import todoItem from '../components/todo.vue';
import doingItem from '../components/doing.vue';
import doneItem from '../components/done.vue';
import novelItem from '../components/novelstory.vue';
import taskAddDialog from '../components/taskAddDialog.vue';
import taskEditDialog from '../components/taskEditDialog.vue';
import taskDeleteDialog from '../components/taskDeleteDialog.vue';
import doneEditDialog from '../components/doneEditDialog.vue';
import doneDeleteDialog from '../components/doneDeleteDialog.vue';
import doingEditDialog from '../components/doingEditDialog.vue';
import doingDeleteDialog from '../components/doingDeleteDialog.vue';
import todoEditDialog from '../components/todoEditDialog.vue';
import todoDeleteDialog from '../components/todoDeleteDialog.vue';
import draggable from 'vuedraggable'
//import Axios from 'axios';
export default {
  //Variables
  data: () => ({
    errors: [],
    tasks: [],
    dones: [],
    doings: [],
    novelstories: [],
    todos: [],
    taskToDelete: {},
    doneToDelete: {},
    doingToDelete: {},
    todoToDelete: {},
    novelToDelete: {},
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    taskToEdit: {},
    doneToEdit: {},
    doingToEdit: {},
    todoToEdit: {},
    novelToEdit: {},
    newtask: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: '',
    deleteName: '',
    rules: {
      email: value => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  //Components this page will need
  components: {
    draggable,
    taskItem: taskItem,
    todoItem: todoItem,
    doingItem: doingItem,
    doneItem: doneItem,
    novelItem: novelItem,
    taskAddDialog: taskAddDialog,
    taskEditDialog: taskEditDialog,
    taskDeleteDialog: taskDeleteDialog,
    doneEditDialog: doneEditDialog,
    doneDeleteDialog: doneDeleteDialog,
    doingEditDialog: doingEditDialog,
    doingDeleteDialog: doingDeleteDialog,
    todoEditDialog: todoEditDialog,
    todoDeleteDialog: todoDeleteDialog,
    novelEditDialog: novelEditDialog,
    novelDeleteDialog: novelDeleteDialog,
  },
  //The methods we will need
  methods: {
    //load all tasks from DB, we call this often to make sure the data is up to date
    load() {
      http.get('novelstories').then(response => {
        this.novelstories = response.data.novelstories;
      });
      http.get('tasks').then(response => {
        this.tasks = response.data.tasks;
      });
      http.get('doings').then(response => {
        this.doings = response.data.doings;
      });
      http.get('dones').then(response => {
        this.dones = response.data.dones;
      });
      http
        .get('todos')
        .then(response => {
          this.todos = response.data.todos;
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
    setupDoneDelete(done) {
       Object.keys(done).forEach(key => {
        this.doneToDelete[key] = done[key];
      });
      this.deleteName = done.name;
      this.deleteDialog = true;
    },
    //opens edit dialog
    setupDoneEdit(done) {
      Object.keys(done).forEach(key => {
        this.doneToEdit[key] = done[key];
      });
      this.editName = done.name;
      this.editDialog = true;
    },
    setupDoingDelete(doing) {
       Object.keys(doing).forEach(key => {
        this.doingToDelete[key] = doing[key];
      });
      this.deleteName = doing.name;
      this.deleteDialog = true;
    },
    //opens edit dialog
    setupDoingEdit(doing) {
      Object.keys(doing).forEach(key => {
        this.doingToEdit[key] = doing[key];
      });
      this.editName = doing.name;
      this.editDialog = true;
    },
    setupTodoDelete(todo) {
       Object.keys(todo).forEach(key => {
        this.todoToDelete[key] = todo[key];
      });
      this.deleteName = todo.name;
      this.deleteDialog = true;
    },
    //opens edit dialog
    setupTodoEdit(todo) {
      Object.keys(todo).forEach(key => {
        this.todoToEdit[key] = todo[key];
      });
      this.editName = todo.name;
      this.editDialog = true;
    },
    setupNovelDelete(novel) {
       Object.keys(novel).forEach(key => {
        this.novelToDelete[key] = novel[key];
      });
      this.deleteName = novel.name;
      this.deleteDialog = true;
    },
    //opens edit dialog
    setupTodoEdit(novel) {
      Object.keys(novel).forEach(key => {
        this.novelToEdit[key] = novel[key];
      });
      this.editName = novel.name;
      this.editDialog = true;
    },
    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting');
      this.$emit('alert', success, callName, resource);
      this.load();
    },
  },
  //get those tasks
  mounted() {
    this.load();
  },
};
</script>