<template>


    <v-card>
      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A Project </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="Name" v-model="project.name" required> </v-text-field>
          <v-text-field label="Topic" v-model="project.topic" required></v-text-field>
          <v-text-field label="Points" v-model="project.points" thumb-label step="1" required> </v-text-field>
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
import { http } from '../config/http'

export default {
  data: () => ({
    project: {
      points: 0,
      name: '',
      topic: ''
    },
    submitDone: true,
  }),

  props: {
    rules: {
      type: Object
    }
  },

  methods: {
    submit() {
      this.submitDone = false
      http
        .post("/newProject", this.project)
        .then(response => {
          this.submit = true
          this.alert(true, 'Create', 'Project')
          this.close()
        })
        .catch(e => {
          this.submit = true
          this.alert(false, 'Create', 'Project')
        });
    },

    load() {
      this.project = {
        points: 0,
        topic: '',
        name: ''
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.project.points <= 0 || this.project.name == '' || this.project.email == '') {
        return true
      } else {
        return false
      }
    },

    alert(success, callName, resource) {
      console.log('Add Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>