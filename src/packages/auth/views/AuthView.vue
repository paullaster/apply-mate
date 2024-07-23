<template>
  <main class="auth">
    <section class="auth-image" v-if="lgAndUp"></section>
    <section :class="lgAndUp ? '' : 'auth-mobile'">
      <v-card :class="lgAndUp ? 'my-4 mx-4' : ''" :width="lgAndUp ? '60%' : '90%'" flat>
        <LoginView v-if="route.name === 'login'"/>
        <ActivateAccount v-if="route.name === 'activate'"/>
        <ForgotPassword v-if="route.name === 'forgot-password'"/>
      </v-card>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import ActivateAccount from '../components/ActivateAccount.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';


// VUETIFY
const { lgAndUp } = useDisplay();


// ROUTER
const route = useRoute();


</script>

<style lang="scss" scoped>
</style>
