<template>
<v-expansion-panel>
  <v-expansion-panel-content class="elevation-24">
    <div slot="header">{{ tasks.name }}</div>
    <hr>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs-6 class="text-xs-left">
      <v-card class="title">
          Details: {{ tasks.details }}
          <br>
          Points: {{ tasks.task_points }}
          <br>
          Assign To: {{ tasks.assigned_to }}
          <br>
          Date: {{ tasks.date_created }}
          <br>
          Status: {{tasks.status}}
      </v-card>
      </v-flex>
      <v-flex xs-4 class="text-xs-right">
        <v-card>
        <v-btn class="red darken-2" @click="$emit('setUpDelete', tasks)">
          <v-icon dark>remove_circle_outline</v-icon>
        </v-btn>

        <v-btn class="blue darken-2" @click="$emit('setUpEdit', tasks)">
          <v-icon dark>mode_edit</v-icon>
        </v-btn>
        </v-card>

        </v-flex>
      </v-layout>
    </v-container>
<hr>
</v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>


export default {

  props: {
    tasks: {
      type: Object
    }
  }
}
</script>