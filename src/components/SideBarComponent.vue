<template>
  <v-navigation-drawer app class="align-center">
    <v-list dense>
      <v-list-item
        v-for="(item, index) in links"
        :key="index"
        :value="item"
        @click="navigateTo(item.path)"
        class="d-flex align-center"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDashboard } from '@/stores'
import { ref } from 'vue'

// REFS
const selectedTab = ref(0)

// ROUTES
const router = useRouter()

// STORE
const dashboardStore = useDashboard()

const { links } = storeToRefs(dashboardStore)
const navigateTo = (route) => {
  router.push(route)
}
</script>

<style scoped>
.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>