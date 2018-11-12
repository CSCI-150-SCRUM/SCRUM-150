<template>


    <v-card>
      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A task </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="Name" v-model="tasks.task_name" required> </v-text-field>
          <v-text-field label="Topic" v-model="tasks.details" required></v-text-field>
          <v-text-field label="Points" v-model="tasks.points" thumb-label step="1" required> </v-text-field>
          <v-text-field label="Project" v-model="tasks.assigned_to" thumb-label step="1" required> </v-text-field>
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
    task: {
      points: 0,
      name: '',
      topic: '',
      project: '', //eventually a drop down
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
        .post("/newtask", this.task)
        .then(response => {
          this.submit = true
          this.alert(true, 'Create', 'task')
          this.close()
        })
        .catch(e => {
          this.submit = true
          this.alert(false, 'Create', 'task')
        });
    },

    load() {
      this.task = {
        points: 0,
        topic: '',
        name: '', 
        project: '', //eventually dropdown
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.task.points <= 0 || this.task.name == '' || this.task.email == '') {
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