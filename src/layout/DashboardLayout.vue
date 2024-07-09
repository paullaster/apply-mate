<template>
  <v-app style="width: 90dvw;">
    <SideBarComponent />
    <TopbarComponentVue />
    <v-main >
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script setup>
import TopbarComponentVue from '@/components/TopbarComponent.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import { useDashboard } from '@/stores'
import links from '@/packages/Dashboard/links'

// STORE
const dashboardStore = useDashboard()



// STORE ACTIONS
dashboardStore.addLinks(links);
</script>
  
  <style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
  