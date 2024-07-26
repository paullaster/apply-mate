<template>
  <v-card elevation="0">
    <v-card-title>
      <v-toolbar>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Applications</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" class="mr-4">
          <v-icon>mdi-magnify</v-icon>
          <span>Search</span>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="applications">
        <template v-slot:[`item.gender`]="{ item }">
          <v-chip :color="ColorHelper.colorsHelper(`gender${item?.gender}`)">{{
            item.gender
          }}</v-chip>
        </template>
        <template v-slot:[`item.age`]="{ item }">
          <v-chip
            :color="
              ColorHelper.colorsHelper(
                DateUtil.calculateAge(item.biodata.dob) < 25
                  ? `age20To24`
                  : DateUtil.calculateAge(item.biodata.dob) < 30
                  ? `age25To29`
                  : `ageAbove30`
              )
            "
            >{{ DateUtil.calculateAge(item.biodata.dob) }}</v-chip
          >
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="ColorHelper.colorsHelper(`status${item.status}`)">{{
            item.status
          }}</v-chip>
        </template>
        <template v-slot:[`item.countyOfOrigin`]="{ item }">
          <v-chip 
          :color="
          ColorHelper.colorsHelper(`county${item.countyOfOrigin}`) ?? `#5867DD`
          "
          >{{
            counties?.find((c) => c?.CountyNo?.trim() === item?.countyOfOrigin?.trim())?.countyName
          }}</v-chip>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <v-chip 
          :color="categoryColors[item?.category]"
          >{{
            categories?.find((c) => c?.code?.trim() === item?.category?.trim())?.description
          }}</v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ DateUtil.toDate(item.createdAt) }}
        </template>
        <template v-slot:[`item.modifiedAt`]="{ item }">
          {{ DateUtil.toDate(item.modifiedAt) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn :color="ColorHelper.colorsHelper('primary')" @click="viewApplication(item)">
            <v-icon class="mr-2">mdi-file-eye</v-icon>
            <span>view</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useApplication, useSetupStore, useAuth } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import DateUtil from '@/util/DateUtil'
import ColorHelper from '@/util/ColorHelper'

// ROUTES
const router = useRouter()

const selected = ref([])
const headers = [
  { title: 'Applicant Name', value: 'fullName' },
  { title: 'Gender', value: 'gender' },
  { title: 'Age', value: 'age' },
  { title: 'Status', value: 'status' },
  { title: 'County of Origin', value: 'countyOfOrigin' },
  { title: 'Category', value: 'category' },
  { title: 'Date Submitted', value: 'createdAt' },
  { title: 'Date Modified', value: 'modifiedAt' },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication()
const setupStore = useSetupStore()
const authStore = useAuth();

// STATE & GETTERS
const { applications } = storeToRefs(applicationStore)
const { counties, categories } = storeToRefs(setupStore)
const { user } = storeToRefs(authStore)

// VARIABLES OR COMPONENT STATE OR REFS
const categoryColors = ref({'default': '#F5F5F5'});


// HOOKS
onMounted(() => {
  categoryColors.value = Object.keys(user.value).length && ColorHelper.createRandonColor(Array.from(new Set(user.value?.categoriesFilter?.split('|'))))
});

// WATCH
watch(
  () => user.value.id,
  () => {
    categoryColors.value = ColorHelper.createRandonColor(Array.from(new Set(user.value?.categoriesFilter?.split('|'))))
  }
);

// METHODS
function viewApplication(item) {
  try {
    router.push({ name: 'application', params: { id: btoa(item.id) } })
  } catch (error) {
    useToast().error(error.message)
  }
}

// STORE ACTIONS
applicationStore.getApplications({ offset: 1, limit: 10 })
setupStore.getCouties()
</script>

<style lang="scss" scoped>
</style>