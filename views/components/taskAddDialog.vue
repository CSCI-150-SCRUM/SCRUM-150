<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title>Add A task</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <v-card-text>
        <!-- Begin Input Row  -->
        <v-form ref="form">
          <v-text-field label="Task Name" v-model="task.name"></v-text-field>
          <v-text-field label="Project Name" v-model="task.project_name"></v-text-field>
          <v-text-field label="Details" v-model="task.details"></v-text-field>
          <!--     <v-text-field label="Status" v-model="task.status"></v-text-field> -->
          <v-text-field label="Assigned To" v-model="task.assigned_to"></v-text-field>
          <v-text-field label="Task Points" v-model="task.points"></v-text-field>
          <v-select
            v-model="task.status"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Status"
            required
          ></v-select>
          <!--      <v-select 
            v-model="select"
            :user="user"
            :rules="[v => !!v || 'Item is required']"
            label="Assign To"
            required
          ></v-select>
          -->
        </v-form>

        <v-card-actions>
          <v-btn
            @click="submit()"
            class="green lighten-1 white--text"
            :disabled="checkForm()"
            :loading="!submitDone"
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
import axios from "axios";
export default {
  data: () => ({
    items: ["Novel/Story", "Back-Log", "To-do", "Doing", "Done"],
    user: ["hello"],
    task: {
      name: "",
      project_name: "",
      details: "",
      status: "",
      assigned_to: "",
      points: 0,
      date_created: ""
      //eventually a drop down
    },
    submitDone: true
  }),

  props: {
    rules: {
      type: Object
    }
  },

  methods: {
    submit() {
      if (this.task.status == "Novel/Story") {
        this.submitDone = false;
        http
          .post("/tasks", this.task)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "Task");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "Task");
          });
      } //For if statement
      if (this.task.status == "To-do") {
        this.submitDone = false;
        http
          .post("/todo", this.task)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "Todo");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "Todo");
          });
      } // if statement

      if (this.task.status == "Done") {
        http
          .post("/done", this.task)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "Done");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "Done");
          });
      } // if statement
      if (this.task.status == "Doing") {
        http
          .post("/doing", this.task)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "Doing");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "Doing");
          });
      } // if statement
    },

    load() {
      this.task = {
        name: ""
      };
      this.submitDone = true;
    },
    /*           http
          .get("users")
          .then(response => {
            this.users = response.data.users;
          })
          .catch(e => {
            this.errors.push(e);
          });
*/

    close() {
      this.load();
      this.$emit("closeAdd");
    },

    checkForm() {
      if (this.task.name == "") {
        return true;
      } else {
        return false;
      }
    },

    alert(success, callName, resource) {
      console.log("Loaded Successfully");
      this.$emit("alert", success, callName, resource);
    }
  }
};
</script>