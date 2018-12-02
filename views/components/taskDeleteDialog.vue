<template>
  <v-card>
     <v-toolbar class="primary primaryText--text" >
      <v-toolbar-title> Delete task Record {{deleteName}} </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <p>This action will remove {{deleteName}} from the application. This is
      <strong>irreversible.</strong>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="confirmDelete()" :loading="!deleteDone" class="red darken-2 white--text">Confirm</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="close()" class="green lighten-1 white--text">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { http } from '../config/http';

export default {
  data: () => ({
    deleteDone: true,
  }),

  props: {
    task: {
      type: Object,
    },
    deleteName: {
      type: String,
      default: '',
    }
  },

  methods: {
    confirmDelete() {
      this.deleteDone = false;
      http
        .delete('/tasks/' + this.task._id)
        .then(response => {
          this.deleteDone = true;
          this.alert(true, 'Delete', 'Task');

          this.close();
          
        })


        .catch(e => {
          this.deleteDone = true;
          this.alert(false, 'Delete', 'Task');
          this.close();
        });
    },

   

    close() {
      this.$emit('closeDelete');
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource);
    },
  },

  mounted() {},
};
</script>

<style>
</style>
