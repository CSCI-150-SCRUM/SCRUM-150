<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit project: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changedproject.project_name"> </v-text-field>
          <v-text-field label="topic" v-model="changedproject.details"> </v-text-field>
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
import { http } from '../config/http'

export default {
  data: () => ({
    changedproject: {
      project_name: '',
      details: '',
    },
    editDone: true
  }),

  props: {
    project: {
      type: Object
    },
    rules: {
      type: Object
    },
    editName: {
      type: String,
      default: ''
    }
  },

  methods: {
    edit() {
      this.editDone = false
      http
        .put("/project/" + this.project._id, this.changedproject)
        .then(response => {
          this.alert(true, 'Edit', 'project')
          this.editDone = true
        })
        .catch(e => {
          this.alert(false, 'Edit', 'project')
          this.editDone = true
        });
        
    },

    close() {
      this.$emit('closeEdit')
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
      this.close()
    },

    checkForm() {
      if (this.changedproject.project_name == '' || this.changedproject.details == '') {
        return true
      } else {
        return false
      }
    }
  },

  mounted() {
    this.changedproject = this.project
  }

}
</script>

<style>

</style>
