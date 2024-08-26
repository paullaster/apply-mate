<template>
  <v-card-title> Login </v-card-title>
  <v-card-text>
    <v-form ref="loginForm" max-width="700" style="transition: all 2s ease-in-out;">
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="email"
            type="email"
            variant="outlined"
            v-model="formData.email"
            :rules="rules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="password"
            type="password"
            variant="outlined"
            v-model="formData.password"
            :rules="rules.password"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="6">
          <v-btn
            @click="login"
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"
            v-if="mdAndUp"
          >
            <v-icon class="mr-3">mdi-lock</v-icon>
            <span>Login</span>
          </v-btn>
          <v-btn
            @click="login"
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"
            v-if="!mdAndUp"
            block
          >
            <v-icon class="mr-3">mdi-lock</v-icon>
            <span>Login</span>
          </v-btn>
        </v-col>
        <v-col cols="12" lg="6" class="d-flex flex-end">
          <v-btn
            @click="()=>router.push({name: 'register'})"
            variant="flat"
            v-if="mdAndUp"
          >
            <span>Register</span>
          </v-btn>
          <v-btn
            @click="()=>router.push({name: 'register'})"
            variant="flat"
            v-if="!mdAndUp"
            block
          >
            <v-icon class="mr-3">mdi-lock</v-icon>
            <span>Register</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col col="12" lg="6">
        <v-btn text flat @click="() => router.push({ name: 'forgot-password' })"
          >forgot password?</v-btn
        >
      </v-col>
      <v-col col="12" lg="6">
        <v-btn text flat @click="() => router.push({ name: 'activate' })"> activate account </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup>
import { useAuth } from '@/stores'
import ColorHelper from '@/util/ColorHelper'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDisplay } from 'vuetify/lib/framework.mjs'

// VUETIFY UTILS
const { mdAndUp } = useDisplay()

// REFS
const loginForm = ref(null)

// MY STORE CALLS
const authStore = useAuth()

// GTTERS & STATES
const { user } = storeToRefs(authStore)

// COMPONENT METHODS
async function login() {
  try {
    const { valid } = await loginForm.value.validate()
    if (!valid) {
      useToast().error('Invalid login information')
      return
    }
    await authStore.login(formData.value)
  } catch (error) {
    useToast().error(error.message)
  }
}

// ROUTES
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const rules = computed(() => {
  return {
    email: [
      (v) => !!v || 'Email is required',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
    ],
    password: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must be at least 8 characters long'
    ]
  }
})

// SET ROUTING

// WATCHERS
watch(
  () => user.value,
  (newUser) => {
    if (newUser && Object.keys(newUser).length) {
      router.push({
        name: 'userLayout',
        params: { user: btoa(newUser.id) }
      })
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
</style>