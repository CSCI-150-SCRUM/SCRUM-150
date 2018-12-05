<template>
  <v-card class="corner" width="500px">
    <v-toolbar class="primary primaryText--text">
      <v-toolbar-title>Register</v-toolbar-title>
      <a href="/#/login">
        <img src="https://img.icons8.com/carbon-copy/50/000000/password.png">
      </a>
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
          <v-btn :disabled="!valid" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    password: "",
    items: [
      {
        icon: "api_key",
        title: "Login",
        href: "/#/login",
        router: true
      }
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios
          .post("/api/auth/register/", {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$swal(
              "Good Job!!",
              "You have registered you can now login",
              "success"
            );
            this.$router.push(this.$route.query.redirect || "/login");
          })
          .catch(() => {
            this.$swal("Error!", "Wrong username or password", "error");
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    clickMethod() {
      this.$router.push("/#/login");
    }
  }
};
</script>


<style scoped>
.corner {
  border-radius: 50px;
}
</style>