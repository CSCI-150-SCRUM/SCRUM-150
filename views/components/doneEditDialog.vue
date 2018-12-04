<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit done: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changeddone.name"> </v-text-field>
          <v-text-field label="Points" v-model="changeddone.done_points" thumb-label step="1"></v-text-field>
          <v-text-field label="Details" v-model="changeddone.details"> </v-text-field>
          <v-text-field label="Assigned to" v-model="changeddone.assigned_to"> </v-text-field>
          <v-text-field label="Status" v-model="changeddone.status"> </v-text-field>
          <v-text-field label="Project Name" v-model="changeddone.project_name"> </v-text-field>
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
    changeddone: {
      done_points: 0,
      name: '',
      project_name: '',
      details: '',
      assigned_to: '', //eventually a drop down
      status: '',
    },
    editDone: true,
  }),

  props: {
    done: {
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
        .put('/dones/' + this.done._id, this.changeddone)
        .then(response => {
          this.alert(true, 'Edit', 'Done');
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Done');
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
        this.changeddone.done_points <= 0 ||
        this.changeddone.name == '' ||
        this.changeddone.details == ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.changeddone = this.done;
  },
};
</script>

<style>
</style>
