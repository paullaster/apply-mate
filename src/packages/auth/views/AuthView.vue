<template>
  <main class="auth">
    <section class="auth-image" v-if="lgAndUp"></section>
    <section :class="lgAndUp ? '' : 'auth-mobile'" :style="lgAndUp? 'margin: auto auto' : ''">
      <div
        style="
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          padding: 4rem 2rem;
          width: max-content;
          border-radius: 0.8rem;
        "
      >
        <v-card
          :class="lgAndUp ? 'd-flex flex-column justify-center align-center' : 'py-4'"
          :width="lgAndUp ? '100%' : '100%'"
          flat
        >
          <LoginView v-if="route.name === 'login'" />
          <ActivateAccount v-if="route.name === 'activate'" />
          <ForgotPassword v-if="route.name === 'forgot-password'" />
          <SetPassword v-if="route.name === 'set-password'" />
        </v-card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import ActivateAccount from '../components/ActivateAccount.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import SetPassword from '../components/SetPassword.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

// VUETIFY
const { lgAndUp } = useDisplay()

// ROUTER
const route = useRoute()
</script>

<style lang="scss" scoped>
</style>
