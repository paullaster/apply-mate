<template>
  <v-app-bar app>
    <v-toolbar-title>{{ APPNAME }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <span>{{ user.name }}</span>
  </v-app-bar>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores';
import AuthService from '@/packages/auth/AuthService';
import { APPNAME } from '@/environment';

// STORES
const authStore = useAuth();
const {user} = storeToRefs(authStore);
authStore.setUser(AuthService.getUser());

</script>

<style lang="scss" scoped>
</style>