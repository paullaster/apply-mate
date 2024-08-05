<template>
   <SpinnerComponent v-if="loading" />
   <router-view></router-view>
</template>

<script setup>
import SpinnerComponent from './components/SpinnerComponent.vue';
import { useGlobalStore } from './stores';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { loading } = storeToRefs(globalStore);


</script>