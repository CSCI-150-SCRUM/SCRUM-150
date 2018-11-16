<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit doing: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changeddoing.name"> </v-text-field>
          <v-text-field label="points" v-model="changeddoing.task_points" thumb-label step="1"></v-text-field>
          <v-text-field label="topic" v-model="changeddoing.details"> </v-text-field>
          <v-text-field label="project" v-model="changeddoing.assigned_to"> </v-text-field>
          <v-text-field label="project" v-model="changeddoing.status"> </v-text-field>
          <v-text-field label="project" v-model="changeddoing.date_created"> </v-text-field>
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
    changeddoing: {
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
    doing: {
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
        .put('/doing/' + this.doing._id, this.changeddoing)
        .then(response => {
          this.alert(true, 'Edit', 'Doing');
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Doing');
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
        this.changeddoing.points <= 0 ||
        this.changeddoing.name == '' ||
        this.changeddoing.details == ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.changedtask = this.doing;
  },
};
</script>

<style>
</style>
