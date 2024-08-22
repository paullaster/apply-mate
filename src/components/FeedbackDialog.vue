<template>
  <v-list lines="three">
    <v-list-subheader inset>Comments</v-list-subheader>
    <v-group v-for="feedback in feedbackHistory" :key="feedback.documentNo">
      <v-list-item :subtitle="feedback.comment" :title="feedback.reviewer">
        <template v-slot:prepend>
          <v-avatar :color="ColorHelper.colorsHelper(user.role.toLowerCase())">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </template>
      </v-list-item>
      <v-divider inset></v-divider>
    </v-group>
  </v-list>
</template>
  
  <script setup>
import ColorHelper from '@/util/ColorHelper'
import { useAuth, useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'

const authStore = useAuth()
const globalStore = useGlobalStore()
const { user } = storeToRefs(authStore)
const { feedbackHistory } = storeToRefs(globalStore)
</script>