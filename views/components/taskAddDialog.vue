<template>

    <v-card>

      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A task </v-toolbar-title>
      </v-toolbar>

     <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row  -->
          <v-form ref="form">

            <v-text-field label="Name" v-model="task.name"> </v-text-field>
            <v-text-field label="Task Points" v-model="task.task_points"> </v-text-field>
            <v-text-field label="Date Created" v-model="task.date_created"> </v-text-field>
            <v-text-field label="Details" v-model="task.details"> </v-text-field>
            <v-text-field label="Assigned To" v-model="task.assigned_to"> </v-text-field>
            <v-text-field label="Status" v-model="task.status"> </v-text-field>
            
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
      task_points: 0,
      name: '',
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
        .post("/tasks", this.task)
        .then(response => {
          this.submit = true
          this.alert(true, 'Create', 'Task')
          this.close()
        })
        .catch(e => {
          this.submit = true
          this.alert(false, 'Create', 'Task')
        });
    },

    load() {
      this.task = {
        name: ''
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.task.name == '') {
        return true
      } else {
        return false
      }
    },

    alert(success, callName, resource) {
      console.log('Loaded Successfully')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>