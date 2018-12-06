<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title>Add A group</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <v-card-text>
        <!-- Begin Input Row  -->
        <v-form ref="form">
          <v-text-field label="group Name" v-model="group.name"></v-text-field>
          <v-text-field label="Project Name" v-model="group.project_name"></v-text-field>
          <v-text-field label="Details" v-model="group.details"></v-text-field>
          <!--     <v-text-field label="Status" v-model="group.status"></v-text-field> -->
          <v-text-field label="Assigned To" v-model="group.assigned_to"></v-text-field>
          <v-text-field label="group Points" v-model="group.points"></v-text-field>
          <v-select
            v-model="group.status"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Status"
            required
          ></v-select>
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
    group: {
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
      if (this.group.status == "Back-Log") {
        this.submitDone = false;
        http
          .post("/groups", this.group)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "group");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "group");
          });
      } //For if statement
      if (this.group.status == "To-do") {
        this.submitDone = false;
        http
          .post("/todo", this.group)
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

      if (this.group.status == "Done") {
        http
          .post("/done", this.group)
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
      if (this.group.status == "Doing") {
        http
          .post("/doing", this.group)
          .then(response => {
            this.submitDone = true;
            this.alert(true, "Create", "Doing");
            this.close();
          })
          .catch(e => {
            this.submitDone = true;
            this.alert(false, "Create", "Doing");
          });
      }
    },

    load() {
      this.group = {
        name: ""
      };
      this.submitDone = true;
    },

    close() {
      this.load();
      this.$emit("closeAdd");
    },

    checkForm() {
      if (this.group.name == "") {
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