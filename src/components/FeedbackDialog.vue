<template>
  <v-list
      :items="comments"
      lines="three"
      item-props
    >
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
      <template v-slot:prepend="{  }">
        <v-avatar 
        :color="
        ColorHelper.colorsHelper(
          user.role.toLowerCase() === 'hr'  ?  'success' : 
          user.role.toLowerCase() === 'lead' ? 'lead' : user.role.toLowerCase()
        )
        "
        >
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </template>
    </v-list>
</template>
  
  <script setup>
import ColorHelper from '@/util/ColorHelper';
import { useAuth } from '@/stores';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

 const authStore = useAuth();
    const {user} =  storeToRefs(authStore);
    const comments = ref([
        { type: 'subheader', title: 'Comments' },
        {
          prepend: 'mdi-account',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ])
  </script>