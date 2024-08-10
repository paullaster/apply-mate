<template>
   <section class="profile_toggle">
     <div class="profile_toggle_btn" @click="toggleProfile">
      <v-btn class="ml-2" :color="ColorHelper.colorsHelper('primary')" variant="text" >
      <v-icon class="mr-3" >mdi-account-circle</v-icon>
      <span>Profile</span>
    </v-btn>
   <v-btn class="ml-2 my-2" :color="ColorHelper.colorsHelper('primary')" variant="text" >
      <v-icon class="mr-3" >mdi-cogs</v-icon>
      <span>Settings</span>
    </v-btn>
    <v-btn class="ml-2 my-2" :color="ColorHelper.colorsHelper('primary')" variant="text" @click="async()=>await authStore.logout()">
      <v-icon class="mr-3" >mdi-logout</v-icon>
      <span>Logout</span>
    </v-btn>
     </div>
     
   </section>
</template>

<script setup>
import { useAuth } from '@/stores';
import ColorHelper from '@/util/ColorHelper';

//STORE
const authStore = useAuth();

</script>