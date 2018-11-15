<template>
  <v-container class="pa-0">
    <v-container>
      <template>
          <v-layout row>
            <v-flex>
              <v-card>
                <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Please Log In </v-toolbar-title>
                </v-toolbar>
                <v-container fluid>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="username"
                        :rules="usernameRules"
                        :counter="10"
                        label="Username"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                      ></v-text-field>
                      <v-btn
                        :disabled="!valid"
                        @click="submit"
                      >
                        submit
                      </v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </v-form>
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
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 12) || 'Username must be less than 12 characters'
      ],
      password: '',
      select: null,
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/', {
            username: this.username,
            password: this.password,
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>
  
</style>