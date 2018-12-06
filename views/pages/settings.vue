<template>
  <v-container grid-list-md>
    <v-responsive>
      <v-layout wrap row justify-center align-center>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn color="purple">Profile</v-btn>
          <br>
        </v-flex>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn color="red">Change Password</v-btn>
          <br>
        </v-flex>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn color="orange">Light Mode</v-btn>
          <br>
        </v-flex>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn color="green">Change Username</v-btn>
          <br>
        </v-flex>
        <v-flex xs4 sm4 md3 lg2>
          <v-btn color="pink">Edit Font</v-btn>
          <br>
        </v-flex>
        <v-btn color="light blue">Connect to Facebook</v-btn>
      </v-layout>
    </v-responsive>
  </v-container>
</template>

<style>
.v-btn {
  border-radius: 50px;
}
</style>
