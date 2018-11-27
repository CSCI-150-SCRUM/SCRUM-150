<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit task: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changedtask.name"> </v-text-field>
          <v-text-field label="Points" v-model="changedtask.task_points" thumb-label step="1"></v-text-field>
          <v-text-field label="Details" v-model="changedtask.details"> </v-text-field>
          <v-text-field label="Assigned to" v-model="changedtask.assigned_to"> </v-text-field>
          <v-text-field label="Status" v-model="changedtask.status"> </v-text-field>
          <v-text-field label="Date Created" v-model="changedtask.date_created"> </v-text-field>
        </v-form>

        <v-card-actions>
          <v-btn @click="edit()" :loading="!editDone" :disabled="checkForm()" class="green lighten-1 white--text">Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="close()" class="red white--text">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { http } from '../config/http';

export default {
  data: () => ({
    changedtask: {
      task_points: 0,
      name: '',
      date_created: '',
      details: '',
      assigned_to: '', //eventually a drop down
      status: '',
    },
    editDone: true,
  }),

  props: {
    task: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    editName: {
      type: String,
      default: '',
    },
  },

  methods: {
    edit() {
      this.editDone = false;
      http
        .put('/tasks/' + this.task._id, this.changedtask)
        .then(response => {
          this.alert(true, 'Edit', 'Task');
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Task');
          this.editDone = true;
        });
    },

    close() {
      this.$emit('closeEdit');
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource);
      this.close();
    },

    checkForm() {
      if (
        this.changedtask.task_points <= 0 ||
        this.changedtask.name == '' ||
        this.changedtask.details == ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.changedtask = this.task;
  },
};
</script>

<style>
</style>
