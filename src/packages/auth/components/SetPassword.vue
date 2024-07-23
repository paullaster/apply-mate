<template>
    <v-card-title> Set your password </v-card-title>
  <v-card-text>
    <v-form ref="newPasswordForm">
      <v-row>
        <v-col cols="12">
          <v-text-field 
          label="password" 
          type="password" 
          v-model="formData.password"
          :rules="rules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field 
          label="confirm password" 
          type="password" 
          v-model="formData.confirmPassword"
          :rules="rules.confirmPassword"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn flat @click="login">
            <v-icon class="mr-3">mdi-onepassword</v-icon>
            <span>set password</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script setup>
import { ref, computed } from 'vue';

const newPasswordForm = ref(null);
const formData = ref({
  email: '',
  password: ''
});

const rules = computed(() => {
    return {
        password: [
            v =>!!v || 'Password is required',
            v => v.length >= 8 || 'Password must be at least 8 characters long'
        ],
        confirmPassword: [
            v =>!!v || 'Password is required',
            v => v !== formData.value.password || 'Confirm Password and Password must be the same!'
        ]
    }
})

</script>

<style lang="scss" scoped>

</style>