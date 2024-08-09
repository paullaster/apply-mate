<template>
   <SpinnerComponent v-if="loading" />
   <AccessUserProfileToggle v-if="profileToggle"/>
   <router-view></router-view>
</template>

<script setup>
import SpinnerComponent from './components/SpinnerComponent.vue';
import { useGlobalStore } from './stores';
import AccessUserProfileToggle from './packages/profile/views/AccessUserProfileToggle.vue';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { loading, profileToggle } = storeToRefs(globalStore);


</script>