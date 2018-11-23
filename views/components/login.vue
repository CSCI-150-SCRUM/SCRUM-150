<template>
        <v-layout align-center justify-center>
            <v-container fluid>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                
                </v-toolbar>
                <v-card-text>
                    <v-form>
                    <v-text-field prepend-icon="person" v-model="username" label="Username" type="text"></v-text-field>
                    <v-text-field id="password" prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click='logIn'>Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-container>
        </v-layout>
</template>


<script>  
export default {
    data(){
      return {
        username:null,
        password:null
      }
    },
    methods: {
      logIn(){
        this.$store.dispatch('/api/auth/login/',{email:this.email,password:this.password}).then(()=>{
            this.$router.push('/');
        })
        
      }
    }
}
</script>