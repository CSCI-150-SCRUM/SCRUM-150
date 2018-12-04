<template>


    <v-card>
      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A Project </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="Name" v-model="project.project_name" required> </v-text-field>
          <v-text-field label="Details" v-model="project.details" required></v-text-field>
          
          </v-form>

          <v-card-actions>
            <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">Submit</v-btn>
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
    project: {
      project_name: '',
      details: '',
    },
    submitDone: true,
  }),

  props: {
    rules: {
      type: Object,
    },
  },

  methods: { 
    submit() {
      this.submitDone = false;
      http
        .post('/project', this.project)
        .then(response => {
          this.submit = true;
          this.alert(true, 'Create', 'Project');
          this.close();
        })
        .catch(e => {
          this.submit = true;
          this.alert(false, 'Create', 'Project');
        });
    },

    load() {
      this.project = {
        project_name: '',
      };
      this.submitDone = true;
    },

    close() {
      this.load();
      this.$emit('closeAdd');
    },

    checkForm() {
      if (this.project.project_name == '' || this.project.details == '') {
        return true;
      } else {
        return false;
      }
    },

    alert(success, callName, resource) {
      console.log('Add Alerting');
      this.$emit('alert', success, callName, resource);
    },
  },
};
</script>