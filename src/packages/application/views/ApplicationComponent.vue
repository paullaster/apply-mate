<template>
  <v-card elevation="0">
    <v-card-title>
      <v-toolbar>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>{{ route.query?.queue?.toUpperCase() }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          class="mr-4"
          @click="() => (applicationStore.$patch({ 'filteredApplication': [] }), globalStore.$patch({ 'searchQuery': {} }))"
          v-if="filteredApplication.length || isAnyQueryParam"
        >
          <v-icon>mdi-lock-reset</v-icon>
          <span>Reset List</span>
        </v-btn>
        <v-btn variant="outlined" class="mr-4" @click="() => globalStore.setSearchdialog(true)">
          <v-icon>mdi-magnify</v-icon>
          <span>Search</span>
        </v-btn>
        <v-btn
          :disabled="!selected.length"
          @click="batchAcceptApplications"
          :color="ColorHelper.colorsHelper('success')"
          variant="flat"
          class="mr-4"
          v-if="route.query.queue === 'applications'"
        >
          <v-icon class="mr-2">mdi-file-multiple-outline</v-icon>
          <span>accept applications</span>
        </v-btn>
        <v-btn
          :disabled="!selected.length"
          @click="batchReverseOnboardedApplications"
          :color="ColorHelper.colorsHelper('info')"
          variant="flat"
          class="mr-4"
          v-if="route.query.queue !== 'approved'"
        >
          <v-icon class="mr-2">mdi-arrow-u-left-top</v-icon>
          <span>Reverse Applications</span>
        </v-btn>
        <v-btn
          :disabled="!selected.length || user.role !== 'lead'"
          @click="batchOnboardApplications"
          :color="ColorHelper.colorsHelper('success')"
          variant="flat"
          class="mr-4"
          v-if="route.query.queue === 'onboarded'"
        >
          <v-icon class="mr-2">mdi-file-multiple-outline</v-icon>
          <span>Approve Applications</span>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="(filteredApplication.length || isAnyQueryParam) ? filteredApplication : applications"
        :item-value="id"
        return-object
        items-selectable="selectable"
        select-strategy="page"
        v-model="selected"
        items-per-page="10"
        show-select
        :loading="loading"
        search
      >
        <template v-slot:[`item.gender`]="{ item }">
          <v-chip :color="ColorHelper.colorsHelper(`gender${item?.gender}`)" elavation="0">{{
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
          <v-chip :color="ColorHelper.colorsHelper(`county${item.countyOfOrigin}`) ?? `#5867DD`">{{
            counties?.find((c) => c?.CountyNo?.trim() === item?.countyOfOrigin?.trim())?.countyName
          }}</v-chip>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <v-chip :color="categoryColors[item?.category]">{{
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
  <SearchComponent
    :propertiesArray="['Name', 'County of Origin', 'Gender', 'Category', 'Status']"
  />
</template>

<script setup>
import { useApplication, useSetupStore, useAuth, useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { inject, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import DateUtil from '@/util/DateUtil'
import ColorHelper from '@/util/ColorHelper'
import SearchComponent from '@/components/SearchComponent.vue'

// INJECT STATE
const customError = inject('customError')

// ROUTES
const router = useRouter()
const route = useRoute()

const selected = ref([])
const headers = [
  {
    title: 'Applicant Name',
    value: 'fullName',
    sortable: true
  },
  {
    title: 'Gender',
    value: 'gender',
    sortable: true
  },
  { title: 'Age', value: 'age', sortable: true },
  {
    title: 'Status',
    value: 'status',
    sortable: true
  },
  {
    title: 'County of Origin',
    value: 'countyOfOrigin',
    sortable: true
  },
  {
    title: 'Category',
    value: 'category',
    sortable: true
  },
  { title: 'Date Submitted', value: 'createdAt', sortable: true },
  { title: 'Date Modified', value: 'modifiedAt', sortable: true },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication()
const setupStore = useSetupStore()
const authStore = useAuth()
const globalStore = useGlobalStore()

// STATE & GETTERS
const { applications, filteredApplication } = storeToRefs(applicationStore)
const { counties, categories } = storeToRefs(setupStore)
const { loading, searchQuery } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore)

// VARIABLES OR COMPONENT STATE OR REFS
const categoryColors = ref({ default: '#F5F5F5' })
const isAnyQueryParam = ref(false)

// HOOKS
onMounted(() => {
  applicationStore.$patch({
    applications: []
  })
  categoryColors.value =
    Object.keys(user.value).length &&
    ColorHelper.createRandonColor(Array.from(new Set(user.value?.categoriesFilter?.split('|'))))
})

onMounted(() => {
  switch (route.name) {
    case 'applications':
      applicationStore.getApplications({ offset: 1, limit: 10 })
      break
    case 'onboarded':
      applicationStore.getApplications({ offset: 1, limit: 10, onboarding: true })
      break
    case 'approved':
      applicationStore.getApplications({ offset: 1, limit: 10, approved: true })
      break
    default:
      console.log('Unknown')
      break
  }
})

// WATCH
watch(
  () => user.value.id,
  () => {
    categoryColors.value = ColorHelper.createRandonColor(
      Array.from(new Set(user.value?.categoriesFilter?.split('|')))
    )
  }
)

watch(
  () => route.name,
  (name) => {
    globalStore.$reset()
    applicationStore.$reset()
    switch (name) {
      case 'applications':
        applicationStore.getApplications({ offset: 1, limit: 10 })
        break
      case 'onboarded':
        applicationStore.getApplications({ offset: 1, limit: 10, onboarding: true })
        break
      case 'approved':
        applicationStore.getApplications({ offset: 1, limit: 10, approved: true })
        break
      default:
        console.log('Unknown')
        break
    }
  },
  { immediate: true }
)

watch(
  () => searchQuery.value,
  (query) => {
    for (const prop in query) {
      if (query[prop] || query[prop] !== '') {
        isAnyQueryParam.value = true
        return
      }else{
        isAnyQueryParam.value = false;
      }
    }
    !isAnyQueryParam.value && applicationStore.$patch({
      'filteredApplication': []
    });
  },
  { immediate: true, deep: true }
)

// METHODS
function viewApplication(item) {
  try {
    router.push({
      name: 'application',
      params: { id: btoa(item.id) },
      query: { queue: route.query?.queue }
    })
  } catch (error) {
    useToast().error(error.message)
  }
}

function batchAcceptApplications() {
  try {
    globalStore.setLoader(true)
    if (!selected.value.length) {
      useToast().error('No applications selected')
      return globalStore.setLoader(false)
    }
    const applicationsAcceptable = selected.value.filter((app) => app.status === 'New')
    if (!applicationsAcceptable.length) {
      return globalStore.setLoader(false)
    }

    applicationStore
      .batchAcceptApplications(applicationsAcceptable.map((app) => app.no))
      .then((res) => {
        useToast().success(res?.message)
        globalStore.setLoader(false)
        applicationStore.getApplications({ offset: 1, limit: 10 })
      })
      .catch((error) => {
        globalStore.setLoader(false)
        useToast().error(error?.response?.data?.message || error.message || customError)
      })
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  } finally {
    selected.value = []
  }
}

function batchOnboardApplications() {
  try {
    globalStore.setLoader(true)
    if (!selected.value.length) {
      useToast().error('No applications selected')
      return globalStore.setLoader(false)
    }
    const applicationsOnboardable = selected.value.filter((app) => app.status === 'Onboarded')
    if (!applicationsOnboardable.length) {
      return globalStore.setLoader(false)
    }

    applicationStore
      .batchOnboardApplication(applicationsOnboardable.map((app) => app.no))
      .then((res) => {
        useToast().success(res?.message)
        globalStore.setLoader(false)
        applicationStore.getApplications({ offset: 1, limit: 10, onboarding: true })
      })
      .catch((error) => {
        globalStore.setLoader(false)
        useToast().error(error?.response?.data?.message || error.message || customError)
      })
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  } finally {
    selected.value = []
  }
}

function batchReverseOnboardedApplications() {
  try {
    globalStore.setLoader(true)
    if (!selected.value.length) {
      useToast().error('No applications selected')
      return globalStore.setLoader(false)
    }
    const applicationsReversible = selected.value.filter(
      (app) =>
        app.status.trim() === 'Onboarded' && app.onboardedBy.trim() === user.value.consoltium.trim()
    )
    if (!applicationsReversible.length) {
      globalStore.setLoader(false)
      useToast().info(
        'The applications you had selected for reversal were either reversed by another consortium other than yourself or are currently not having the onboraded status. Please select again!'
      )
      return
    }

    applicationStore
      .batchReverseOnboardedApplications(applicationsReversible.map((app) => app.no))
      .then((res) => {
        useToast().success(res?.message)
        globalStore.setLoader(false)
        route.query?.queue === 'onboarded'
          ? applicationStore.getApplications({ offset: 1, limit: 10, onboarding: true })
          : applicationStore.getApplications({ offset: 1, limit: 10 })
      })
      .catch((error) => {
        console.error(error)
        globalStore.setLoader(false)
        useToast().error(
          'Sorry, We could not complete this process at this time. Please try again!'
        )
      })
  } catch (error) {
    globalStore.setLoader(false)
    console.error(error)
    useToast().error('Sorry, We  could not complete this process. Please try again!')
  } finally {
    selected.value = []
  }
}
setupStore.getCouties()

// EVENTS
</script>

<style lang="scss" scoped>
</style>