<template>
  <v-card>
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title> Login </v-toolbar-title>
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
            prepend-icon="person"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
            prepend-icon="lock"
          ></v-text-field>
        </v-form>

        <v-card-actions>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-card-actions>

      </v-card-text>
    </v-container>
  </v-card>
</template>


<script>
  import axios from 'axios'


  export default {
    data: () => ({
      valid: true,
      loggedIn: Boolean,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '',
    }),

    props: {
    logged: {
      type: Boolean,
    },
  },

    methods: {
      submit () {
        this.logged = false;
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/auth/login/', {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            this.$emit('alert');
            this.$router.push(this.$route.query.redirect || '/home')
          })
        }
        
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>