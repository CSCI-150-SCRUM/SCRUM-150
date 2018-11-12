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
    <div class="row">
      <div class="col-md">
        <task-lane id="todo" title="To-Do" :items="todoItems"></task-lane>
      </div>
    </div>
    <div class="col-md">
      <task-lane id="inProgress" title="In progress" :items="inProgressItems"></task-lane>
    </div>
    <div class="col-md">
      <task-lane id="done" title="Done" :items="doneItems"></task-lane>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import taskLane from '../components/taskLane';
  
  export default {
    name: 'board',
    components: {
      'task-lane': taskLane,
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