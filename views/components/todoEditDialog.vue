<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit todo task: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changedtodo.name"> </v-text-field>
          <v-text-field label="points" v-model="changedtodo.points" thumb-label step="1"></v-text-field>
          <v-text-field label="topic" v-model="changedtodo.details"> </v-text-field>
          <v-text-field label="Assigned To" v-model="changedtodo.assigned_to"> </v-text-field>
          <v-text-field label="Status" v-model="changedtodo.status"> </v-text-field>
          <v-text-field label="Date Created" v-model="changedtodo.date_created"> </v-text-field>
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
    changedtodo: {
      points: 0,
      name: '',
      date_created: '',
      details: '',
      assigned_to: '', //eventually a drop down
      status: '',
    },
    editDone: true,
  }),

  props: {
    todos: {
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
        .put('/todo/' + this.todos._id, this.changedtodo)
        .then(response => {
          this.alert(true, 'Edit', 'Todo');
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Todo');
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
        this.changedtodo.points <= 0 ||
        this.changedtodo.name == '' ||
        this.changedtodo.details == ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.changedtodo = this.todos;
  },
};
</script>

<style>
</style>
