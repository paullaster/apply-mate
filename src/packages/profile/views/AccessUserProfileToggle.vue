<template>
   <section class="profile_toggle">
     <div class="profile_toggle_btn" @click="toggleProfile">
      <v-btn icon class="ml-2" :color="ColorHelper.colorsHelper('primary')">
      <v-icon >mdi-account-circle</v-icon>
    </v-btn>
       <span style="margin-left: 2rem; font-weight: 800;" >{{ user?.title }}</span>
     </div>
     <div class="toggle-logout-btn">
       <v-btn variant="flat" @click="async() => await authStore.logout()">
        <v-icon>mdi-logout</v-icon>
         <span>Logout</span>
       </v-btn>
     </div>
   </section>
</template>

<script setup>
import ColorHelper from '@/util/ColorHelper';
import { useAuth } from '@/stores';
import { storeToRefs } from 'pinia';

//STORE
const authStore = useAuth();
const { user } = storeToRefs(authStore);

</script>