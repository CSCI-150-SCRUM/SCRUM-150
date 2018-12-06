<template>
<v-expansion-panel>
  <v-expansion-panel-content class="elevation-24">
    <div slot="header">{{ doings.name }}</div>
    <hr>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs-6 class="text-xs-left">
      <v-card class="title">
          Details: {{ doings.name }}
          <br>
         
      </v-card>
      </v-flex>
      <v-flex xs-4 class="text-xs-right">
        <v-card>
         <v-btn class="red darken-2" @click="$emit('setUpDelete', doing)">
          <v-icon dark>remove_circle_outline</v-icon>
        </v-btn>

          <v-btn class="blue darken-2" @click="$emit('setUpEdit', doing)">
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
    doings: {
      type: Object
    }
  }
};
</script>