<template>
  <v-list lines="three">
    <v-list-subheader inset>Comments</v-list-subheader>
    <v-group v-for="feedback in feedbackHistory" :key="feedback.documentNo">
      <v-list-item :subtitle="feedback.comment" :title="feedback.reviewer">
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-contact</v-icon>
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
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const authStore = useAuth()
const globalStore = useGlobalStore()
const { user } = storeToRefs(authStore)
const { feedbackHistory } = storeToRefs(globalStore)
const comments = ref([
  { type: 'subheader', title: 'Comments' },
  {
    prepend: 'mdi-account',
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle:
      '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    subtitle:
      '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    subtitle:
      '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
  }
])

watch(
  () => feedbackHistory.value,
  (commentHistory) => {
    comments.value = [
      { type: 'subheader', title: 'Comments' },
      ...commentHistory,
      { type: 'divider', inset: true }
    ]
  },
  { immediate: true, deep: true }
)
</script>