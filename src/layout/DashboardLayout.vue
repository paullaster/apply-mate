<template>
  <v-app style="width: 100dvw; padding-inline: .8rem;">
    <SideBarComponent />
    <TopbarComponentVue />
    <v-main >
      <v-container style="width: 100%; padding-inline: 0 !important;">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script setup>
import TopbarComponentVue from '@/components/TopbarComponent.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import { useDashboard, useSetupStore } from '@/stores'
import links from '@/packages/Dashboard/links'

// STORE
const dashboardStore = useDashboard();
const setupStore = useSetupStore();
setupStore.getCouties()



// STORE ACTIONS
dashboardStore.addLinks(links);
</script>
  
  <style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
  