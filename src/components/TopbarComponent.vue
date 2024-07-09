<template>
  <v-app-bar app>
    <v-toolbar-title>My Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <span>{{ user.name }}</span>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

  const user = ref({ name: 'John Doe' });
</script>

<style lang="scss" scoped>
</style>