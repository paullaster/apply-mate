<template>
  <main class="auth">
    <section class="auth-image" v-if="lgAndUp"></section>
    <section :class="lgAndUp ? '' : 'auth-mobile'" :style="lgAndUp ? 'margin: auto auto' : ''">
      <div
        style="
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          padding: 4rem 2rem;
          max-width: 800px;
          border-radius: 0.8rem;
        "
      >
        <v-card
          :class="lgAndUp ? 'd-flex flex-column justify-center align-center' : 'py-4'"
          :width="lgAndUp ? '100%' : '100%'"
          flat
        >
          <LoginView v-if="route.name === 'login'" />
          <RegisterComponent v-if="route.name === 'register'" />
          <ActivateAccount v-if="route.name === 'activate'" />
          <ForgotPassword v-if="route.name === 'forgot-password'" />
          <SetPassword v-if="route.name === 'set-password'" />
          <VerifyAccount v-if="route.name === 'verify-account'" />
        </v-card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import ActivateAccount from '../components/ActivateAccount.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import SetPassword from '../components/SetPassword.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import RegisterComponent from '@/packages/auth/components/RegisterComponent.vue'
import { onMounted, ref, provide } from 'vue'
import { globalEventBus } from 'vue-toastification'
import VerifyAccount from '../components/VerifyAccount.vue'
import { useAuth } from '@/stores'

// VUETIFY
const { lgAndUp } = useDisplay()

// ROUTER
const route = useRoute()
const router = useRouter()

// STORES
const authStore = useAuth()

// VARS
const account = ref({})

// HOOKS
onMounted(() => {
  globalEventBus.on('verifyAccount', (data) => {
    account.value = data
    // Initiate OTP request
    authStore.sendOTPRequest({
      email: account.value.email,
      phone: account.value.phone,
    })
  })
  globalEventBus.on('load-otp-screen', ()=> {
    router.push({ name: 'verify-account' })
  })
})

// PROVIDERS
provide('account', account)
</script>
