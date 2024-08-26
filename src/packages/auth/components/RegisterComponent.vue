<template>
  <v-card-titl>Register {{}} Account</v-card-titl>
  <v-card-text>
    <v-form ref="registerForm" max-width="700" style="transition: all 5s ease-in-out">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formData.email"
            :rules="rules.email"
            label="Email"
            variant="outlined"
            style="transition: all 2s ease-in-out;"
            
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.firstName"
            :rules="rules.required"
            label="First Name"
            variant="outlined"
            style="transition: all 2s ease-in-out;"
            
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.lastName"
            :rules="rules.required"
            label="Last Name"
            variant="outlined"
            style="transition: all 2s ease-in-out;"
            
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.password"
            type="password"
            label="Password"
            variant="outlined"
            :rules="rules.password"
            style="transition: all 2s ease-in-out;"
            
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.confirmPassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            :rules="rules.confirmPassword"
            style="transition: all 2s ease-in-out;"
            
          />
        </v-col>
        <v-col col="12" lg="6">
          <v-btn
            type="submit"
            variant="flat"
            @click="register"
            :color="ColorHelper.colorsHelper('primary')"
            v-if="mdAndUp"
            >Register</v-btn
          >
          <v-btn
            type="submit"
            variant="flat"
            @click="register"
            :color="ColorHelper.colorsHelper('primary')"
            v-if="!mdAndUp"
            block
            >Register</v-btn
          >
        </v-col>
        <v-col col="12" lg="6" class="d-flex justify-end">
          <v-btn flat @click="() => router.push({ name: 'login' })">Login</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script setup>
import { useAuth } from '@/stores'
import ColorHelper from '@/util/ColorHelper'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDisplay } from 'vuetify/lib/framework.mjs'

// VUETIFY API
const { mdAndUp } = useDisplay()

// ROUTING
const router = useRouter()

// STORES
const authStore = useAuth()

// COMPONENT VARS
const formData = ref({
  email: '',
  firstName:'',
  lastName: '',
  password: '',
  confirmPassword: '',
  type: 'institution'
})
const registerForm = ref(null)

// COMPUTED PROPS
const rules = computed(() => {
  return {
    required: [(v) => !!v || 'Required'],
    email: [
      (v) => !!v || 'Email is required',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format',
      (v) => {
        const domain = v.substring(v.indexOf('@')).split('.').slice(1).join('.')
        console.log(domain)
        const isDomainAvailable = ['ac.ke', '.edu', '.SC.KE'].includes(domain)
        console.log(isDomainAvailable)
        return isDomainAvailable || 'Email from this domain is not accepted'
      }
    ],
    password: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must be at least 8 characters long'
    ],
    confirmPassword: [
      (v) => !!v || 'Confirm Password is required',
      (v) => v === formData.value.password || 'Passwords do not match'
    ]
  }
})

// METHODS
async function register() {
  try {
    const { valid } = await registerForm.value.validate()
    if (!valid) {
      useToast().success('enter valid information')
      return
    }
    authStore.register(formData.value)
  } catch (error) {
    console.log(error)
    useToast().error('Error registering')
  }
}
</script>

<style lang="scss" scoped>
</style>