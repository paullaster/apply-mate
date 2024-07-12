<template>
  <main class="auth">
    <section class="auth-image"></section>
    <section>
      <v-card class="my-4 mx-4" width="60%" flat>
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


// ROUTER
const route = useRoute();


</script>

<style lang="scss" scoped>
</style>
