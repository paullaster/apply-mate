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
import { useDashboard, useSetupStore, useAuth } from '@/stores'
import links from '@/packages/Dashboard/links'
import { storeToRefs } from 'pinia';

// STORE
const dashboardStore = useDashboard();
const setupStore = useSetupStore();
const authStore = useAuth();

const { user } = storeToRefs(authStore)

setupStore.getCouties();
setupStore.getCategories();



// STORE ACTIONS
dashboardStore.addLinks(links);


// ASYNC TIMERS
setInterval(() =>{
  const now = Date.now();
  const userExp = user.value?.exp * 1000;
  if (userExp && userExp <= now) {
    authStore.logout();
  }else {
    console.log(userExp && userExp <= now)
    dashboardStore.updateUserStatus(user.value);
  }
}, 60000)
</script>
  
  <style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
  