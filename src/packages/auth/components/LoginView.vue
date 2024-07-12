<template>
  <v-card-title> Login </v-card-title>
  <v-card-text>
    <v-form ref="loginForm">
      <v-row>
        <v-col cols="12">
          <v-text-field 
          label="email" 
          type="email" 
          v-model="formData.email"
          :rules="rules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field 
          label="password" 
          type="password" 
          v-model="formData.password"
          :rules="rules.password"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn flat @click="login">
            <v-icon class="mr-3">mdi-lock</v-icon>
            <span>Login</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col col="12" lg="6">
        <v-btn text flat @click="()=>router.push({name: 'forgot-password'})">forgot password?</v-btn>
      </v-col>
      <v-col col="12" lg="6">
        <v-btn text flat @click="() => router.push({ name: 'activate' })"> activate account </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
import { useAuth } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';

// REFS
const loginForm = ref(null);


// MY STORE CALLS
const authStore = useAuth();

// GTTERS & STATES
const {user} = storeToRefs(authStore);

// COMPONENT METHODS
async function login() {
    try {
        const { valid } = await loginForm.value.validate();
        if (!valid) {
            useToast().error("Invalid login information");
            return;
        };
        await authStore.login(formData.value);
    } catch (error) {
        useToast().error(error.message);
    }
}

// ROUTES
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
});

const rules = computed(() => {
    return {
        email: [
            v =>!!v || 'Email is required',
            v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
        ],
        password: [
            v =>!!v || 'Password is required',
            v => v.length >= 8 || 'Password must be at least 8 characters long'
        ]
    }
})

// SET ROUTING
</script>

<style lang="scss" scoped>
</style>