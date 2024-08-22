<template>
    <v-row flex class="justify-center">
        <v-navigation-drawer 
        v-model="applicantQuickView"
        location="end"
        temporary
        width="1000"
        style="max-width: 1000px;"
        v-if="applicantQuickView"
        >
            <ApplicationView />
        </v-navigation-drawer>
    </v-row>
</template>

<script setup>
import { useGlobalStore } from '@/stores';
import { storeToRefs } from 'pinia';
import ApplicationView from '@/packages/application/components/ApplicationView.vue';

// STORES
const globalStore = useGlobalStore()
const { applicantQuickView } = storeToRefs(globalStore);

</script>

<style lang="scss" scoped>

</style>