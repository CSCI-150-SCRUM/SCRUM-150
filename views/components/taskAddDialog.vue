<template>

    <v-card>

      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A task </v-toolbar-title>
      </v-toolbar>

     <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row  -->
          <v-form ref="form">
            <v-text-field label="Name" v-model="tasks.task_name"> </v-text-field>
            <v-text-field label="points" v-model="tasks.task_points" thumb-label step="1"></v-text-field>
            <v-text-field label="topic" v-model="tasks.details"> </v-text-field>
            <v-text-field label="project" v-model="tasks.assigned_to"> </v-text-field>
            <v-text-field label="project" v-model="tasks.status"> </v-text-field>
            <v-text-field label="project" v-model="tasks.date_created"> </v-text-field>
          </v-form> 

          <v-card-actions>
            <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="close()" class="red white--text">Close</v-btn>
          </v-card-actions> 

        </v-card-text>
      </v-container> -->

    </v-card> 

</template> 


<script>
import { http } from '../config/http'

export default {
  data: () => ({
    tasks: {
      task_points: 0,
      task_name: '',
      date_created: '',
      details: '',
      assigned_to: '', //eventually a drop down
      status: ''
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
        task_name: '',
        date_created: '',
        details: '',
        assigned_to: '', //eventually a drop down
        status: ''
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.tasks.task_points <= 0 || this.tasks.task_name == '' || this.tasks.details == '') {
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