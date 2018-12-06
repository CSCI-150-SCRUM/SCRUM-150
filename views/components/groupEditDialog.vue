<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title>Edit group: {{editName}}</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>
        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changedtask.name"></v-text-field>
          <v-text-field label="Points" v-model="changedtask.task_points" thumb-label step="1"></v-text-field>
          <v-text-field label="Details" v-model="changedtask.details"></v-text-field>
          <v-text-field label="Assigned to" v-model="changedtask.assigned_to"></v-text-field>
          <v-text-field label="Status" v-model="changedtask.status"></v-text-field>
          <v-text-field label="Project Name" v-model="changedtask.project_name"></v-text-field>
        </v-form>

        <v-card-actions>
          <v-btn
            @click="edit()"
            :loading="!editDone"
            :disabled="checkForm()"
            class="green lighten-1 white--text"
          >Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="close()" class="red white--text">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { http } from "../config/http";

export default {
  data: () => ({
    changedtask: {
      task_points: 0,
      name: "",
      project_name: "",
      details: "",
      assigned_to: "", //eventually a drop down
      status: ""
    },
    editDone: true
  }),

  props: {
    group: {
      type: Object
    },
    rules: {
      type: Object
    },
    editName: {
      type: String,
      default: ""
    }
  },

  methods: {
    edit() {
      this.editDone = false;
      http
        .put("/groups/" + this.group._id, this.changedtask)
        .then(response => {
          this.alert(true, "Edit", "group");
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, "Edit", "group");
          this.editDone = true;
        });
    },

    close() {
      this.$emit("closeEdit");
    },

    alert(success, callName, resource) {
      this.$emit("alert", success, callName, resource);
      this.close();
    },

    checkForm() {
      if (
        this.changedtask.task_points <= 0 ||
        this.changedtask.name == "" ||
        this.changedtask.details == ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {
    this.changedtask = this.group;
  }
};
</script>

<style>
</style>
