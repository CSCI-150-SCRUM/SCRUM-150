<template>
  <v-container grid-list-md>
    <v-responsive>
      <v-layout wrap row justify-center align-center>
        <v-flex xs6 sm4 md3 lg2>
          <v-btn block color="purple">Profile</v-btn>
          <br>
        </v-flex>
        <v-flex xs6 sm4 md3 lg2>
          <v-btn block color="red">Change Password</v-btn>
          <br>
        </v-flex>
        <v-flex xs6 sm4 md3 lg2>
          <v-btn block color="orange">Light Mode</v-btn>
          <br>
        </v-flex>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn block color="green">Change Username</v-btn>
          <br>
        </v-flex>
        <v-flex xs6 sm4 md3 lg2>
          <v-btn block color="pink">Edit Font</v-btn>
          <br>
        </v-flex>
          <v-flex xs6 sm4 md3 lg2>
          <v-btn block color="light blue">Connect to Facebook</v-btn>
        </v-flex>
      </v-layout>
    </v-responsive>
  </v-container>
</template>

<style>
.v-btn {
  border-radius: 50px;
}
</style>
