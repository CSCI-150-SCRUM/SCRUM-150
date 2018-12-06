<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Edit task: {{editName}} </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
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
import { http } from '../config/http';

export default {
  data: () => ({
    items: ["Novelstory", "Back-Log", "To-do", "Doing", "Done"],
    changedtask: {
      name: "",
      project_name: "",
      details: "",
      status: "",
      assigned_to: "",
      points: 0,
      date_created: ""
    },
    editDone: true,
  }),

  props: {
    task: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    editName: {
      type: String,
      default: '',
    },
  },

  methods: {
    edit() {
      //STAYS THE SAME
      if(this.changedtask.status == 'Back-Log') {
      this.editDone = false;
      http
        .put('/tasks/' + this.task._id, this.changedtask)
        .then(response => {
          this.alert(true, 'Edit', 'Task');
          this.editDone = true;
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Task');
          this.editDone = true;
        });
      } 
      //TODO
      if(this.changedtask.status == 'To-do'){
        this.editDone = false;
        http
        .delete('/tasks/' + this.task._id)
        .then(response => {
          this.deleteDone = true;
          this.alert(true, "Delete", "Task");
          this.close();
        })
      
        .catch(e => {
          this.deleteDone = true;
          this.alert(false, "Delete", "Task");
          this.close();
        });
        http
          .post("/todo", this.changedtask)
          .then(response => {
            this.editDone = true;
            this.submitDone = true;
            this.alert(true, "Create", "Todo");
            this.close();
          })
          .catch(e => {
            this.editDone = true;
            this.alert(false, "Create", "Todo");
      });
      }
      //NOVELSTORY
        if(this.changedtask.status == 'Novelstory'){
        this.editDone = false;
        http
        .delete('/tasks/' + this.task._id)
        .then(response => {
          this.deleteDone = true;
          this.alert(true, "Delete", "Task");
          this.close();
        })
      
        .catch(e => {
          this.deleteDone = true;
          this.alert(false, "Delete", "Task");
          this.close();
        });
        http
          .post("/novelstory", this.changedtask)
          .then(response => {
            this.editDone = true;
            this.submitDone = true;
            this.alert(true, "Create", "Novelstory");
            this.close();
          })
          .catch(e => {
            this.editDone = true;
            this.alert(false, "Create", "Novelstory");
      });
      }
      //DOING
        if(this.changedtask.status == 'Doing'){
        this.editDone = false;
        http
        .delete('/tasks/' + this.task._id)
        .then(response => {
          this.deleteDone = true;
          this.alert(true, "Delete", "Task");
          this.close();
        })
      
        .catch(e => {
          this.deleteDone = true;
          this.alert(false, "Delete", "Task");
          this.close();
        });
        http
          .post("/doing", this.changedtask)
          .then(response => {
            this.editDone = true;
            this.submitDone = true;
            this.alert(true, "Create", "Doing");
            this.close();
          })
          .catch(e => {
            this.editDone = true;
            this.alert(false, "Create", "Doing");
      });
      }
      //DONE
        if(this.changedtask.status == 'Done'){
        this.editDone = false;
        http
        .delete('/tasks/' + this.task._id)
        .then(response => {
          this.deleteDone = true;
          this.alert(true, "Delete", "Task");
          this.close();
        })
      
        .catch(e => {
          this.deleteDone = true;
          this.alert(false, "Delete", "Task");
          this.close();
        });
        http
          .post("/done", this.changedtask)
          .then(response => {
            this.editDone = true;
            this.submitDone = true;
            this.alert(true, "Create", "Done");
            this.close();
          })
          .catch(e => {
            this.editDone = true;
            this.alert(false, "Create", "Done");
      });
      }
    },

    close() {
      this.$emit('closeEdit');
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource);
      this.close();
    },

    checkForm() {
      if (
        this.changedtask.task_points <= 0 ||
        this.changedtask.name == '' ||
        this.changedtask.details == ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    this.changedtask = this.task;
  },
};
</script>

<style>
</style>
