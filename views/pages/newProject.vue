<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-toolbar class="primary primaryText--text">
              <v-toolbar-title> Welcome to ScrumBag </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <v-card-text>
                  This is where we will have our main module.
                </v-card-text>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    value: "",
    num1: 0,
    num2: 0
  })

}
</script>

<style>

</style>
