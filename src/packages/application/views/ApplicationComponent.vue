<template>
  <v-card elevation="0">
    <v-card-title>
      <v-toolbar>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>{{ route?.meta?.title?.toUpperCase() }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          class="mr-4"
          @click="resetApplicationList"
          v-if="filteredApplication.length || isAnyQueryParam"
        >
          <v-icon>mdi-lock-reset</v-icon>
          <span>Reset List</span>
        </v-btn>
        <v-btn variant="outlined" class="mr-4" @click="() => globalStore.setSearchdialog(true)">
          <v-icon>mdi-magnify</v-icon>
          <span>Search</span>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="hostelRequests"
        :item-value="id"
        return-object
        items-selectable="selectable"
        select-strategy="page"
        v-model="selected"
        show-select
        :loading="loading"
        search
        mobile-breakpoint="md"
        items-per-page="20"
        hide-default-footer
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
        <template v-slot:[`item.disabled`]="{ item }">
          <v-chip :color="ColorHelper.colorsHelper(item?.biodata?.disabled?.toLowerCase())">
            {{ item?.biodata?.disabled }}
          </v-chip>
        </template>
        <template v-slot:[`item.approvedByConsortia`]="{ item }">
          <v-chip v-tooltip="`${getConsortiumFullName(item)}`">
            {{ getConsortium(item) }}
          </v-chip>
        </template>
        <template v-slot:[`item.modifiedAt`]="{ item }">
          {{ DateUtil.toDate(item.modifiedAt) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div
          style="
            display: flex;
            flex-wrap: nowrap;
          "
          >
            <v-btn
            @click="() => globalStore.setQuickViewScreen(true, item)"
            class="my-2 mx-1"
            icon
            elevation="0"
            v-tooltip="'Request Quick View'"
            >
            <v-icon :color="ColorHelper.colorsHelper('success')" size="30">mdi-file-find</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            icon
            hint="view application"
            @click="viewApplication(item)"
            class="my-2 mx-1"
            v-tooltip="'View Request Details'"
          >
            <v-icon :color="ColorHelper.colorsHelper('primary')" size="30">mdi-view-grid</v-icon>
          </v-btn>
          </div>
        </template>
      </v-data-table>
      <v-divider></v-divider>
      <div class="text-right" style="padding: 0.4rem 0; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <p>
            Showing {{
              filteredApplication.length || isAnyQueryParam ? 
              filteredApplication.length > 20 ? 20 : filteredApplication.length : 
              applications.length
            }} of {{ displayItemCount }} Applications
          </p>
        </div>
        <v-pagination
          v-model="page"
          :length="totalItemsCount"
          :total-visible=" searchedAgainstAPI ? 1 : 7"
          next-icon="mdi-skip-next"
          prev-icon="mdi-skip-previous"
          variant="flat"
          previous-aria-label="Previous"
          density="comfortable"
          :active-color="ColorHelper.colorsHelper('accent')"
          @update:modelValue="onModalChange"
        ></v-pagination>
      </div>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
  <SearchComponent
    :propertiesArray="['Name', 'County of Origin', 'Gender', 'Category', 'Status']"
  />
  <FeedbackActions />
  <ApplicantQuickView />
</template>

<script setup>
import { useApplication, useSetupStore, useAuth, useGlobalStore, useProfile } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import DateUtil from '@/util/DateUtil'
import ColorHelper from '@/util/ColorHelper'
import SearchComponent from '@/components/SearchComponent.vue'
import FeedbackActions from '@/components/FeedbackActions.vue'
import ApplicantQuickView from '@/components/ApplicantQuickView.vue'

// INJECT STATE
const customError = inject('customError')

// ROUTES
const router = useRouter()
const route = useRoute()

const selected = ref([])
const headers = [
  {
    title: 'Intitution Type',
    value: 'institutionType',
    sortable: true
  },
  {
    title: 'Intitution Name',
    value: 'institutionName',
    sortable: true
  },
  {
    title: 'Campus',
    value: 'campus',
    sortable: true
  },
  { title: 'County', value: 'county', sortable: true },
  {
    title: 'Town',
    value: 'town',
    sortable: true
  },
  {
    title: 'Status',
    value: 'status',
    sortable: true,
    align: 'center'
  },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication()
const setupStore = useSetupStore()
const authStore = useAuth()
const globalStore = useGlobalStore()
const profileStore = useProfile();

// STATE & GETTERS
const { applications, filteredApplication, totalItemsCount, itemCount, searchedAgainstAPI, nextPageToken, itemCountOnQuery } = storeToRefs(applicationStore)
const { counties, categories } = storeToRefs(setupStore)
const { loading, searchQuery, activeCommentable } = storeToRefs(globalStore)
const {hostelRequests} = storeToRefs(profileStore);

const { user } = storeToRefs(authStore)

// VARIABLES OR COMPONENT STATE OR REFS
const categoryColors = ref({ default: '#F5F5F5' })
const page = ref(1)
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
onMounted(()=> {
  profileStore.getHostelRequests();
})
onMounted(() => {
  switch (route.name) {
    case 'applications':
      applicationStore.getApplications({ $top: 20 })
      break
    case 'onboarded':
      applicationStore.getApplications({ $top: 20, onboarding: true })
      break
    case 'approved':
      applicationStore.getApplications({ $top: 20, approved: true })
      break
    default:
      console.log('Unknown')
      break
  }
})

onMounted(() => {
  if (user.value.role.toLowerCase() === 'hr') {
    const consortiaArray = user.value?.consortiaFilter.split('|')
    let consortiaFilter
    consortiaArray.forEach((consortium) => {
      if (!consortiaFilter) {
        consortiaFilter = `no eq '${consortium}'`
      } else {
        consortiaFilter += ` OR no eq '${consortium}'`
      }
    })
    setupStore.getConsortia({ $filter: `${consortiaFilter}` })
  }
})

// COMPUTED
const displayItemCount = computed(() => {
  return (filteredApplication.value.length || isAnyQueryParam.value) ? itemCountOnQuery.value : itemCount.value
})

// WATCH
watch(
  ()=> displayItemCount.value,
  (value)=> {
    applicationStore.$patch({
      totalItemsCount: (Math.ceil(value/20)),
    })
  }
)
watch(
  ()=> page.value,
  (val)=> applicationStore.$patch({
    currentPage: val
  }),
  {immediate: true, deep:true}
)
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
        applicationStore.getApplications({ $top: 20 })
        break
      case 'onboarded':
        applicationStore.getApplications({ $top: 20, onboarding: true })
        break
      case 'approved':
        applicationStore.getApplications({ $top: 20, approved: true })
        break
      case 'hrreviewed':
        applicationStore.getApplications({ $top: 20, hrReviewed: true })
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
      if (!query[prop]) {
        isAnyQueryParam.value = false;
      } else {
        isAnyQueryParam.value = true;
        return
      }
    }
    !isAnyQueryParam.value &&
      applicationStore.$patch({
        filteredApplication: []
      })
  },
  { immediate: true, deep: true }
)

// METHODS
watch(
  () => activeCommentable.value,
  (commentable) => {
    if (Object.keys(commentable).length) {
      globalStore.fetchFeedbackHistory({ documentNo: commentable.no })
    }
  },
  { immediate: true, deep: true }
)
function viewApplication(item) {
  try {
    profileStore.$patch({
      profile: item,
    })
    router.push({
      name: 'request',
      params: { id: btoa(item.id) },
      query: { queue: route.query?.queue }
    })
  } catch (error) {
    useToast().error(error.message)
  }
}


function resetApplicationList() {
  try {
    applicationStore.$patch({ filteredApplication: [], currentPage: 1, searchedAgainstAPI: false })
    globalStore.$patch({
      searchQuery: {
        searchText: '',
        county: '',
        category: ''
      }
    })
    isAnyQueryParam.value = false
    page.value =  1;
  } catch (error) {
    useToast().error('We ran into an error!')
  }
}
function onModalChange() {
  try {
    globalStore.$reset()
    applicationStore.$patch({
      filteredApplication: [],
    })
    if (searchedAgainstAPI.value && nextPageToken.value) {
      applicationStore.goToNextFilteredPage();
      return;
    }else {
      searchedAgainstAPI.value = false;
    }
    if (Number(page.value) === 1) {
      switch (route.name) {
        case 'applications':
          applicationStore.getApplications({ $top: 20, })
          break
        case 'onboarded':
          applicationStore.getApplications({ $top: 20, onboarding: true })
          break
        case 'approved':
          applicationStore.getApplications({ $top: 20, approved: true })
          break
        case 'hrreviewed':
          applicationStore.getApplications({ $top: 20, hrReviewed: true })
          break
        default:
          console.log('Unknown')
      }
    }
    switch (route.name) {
      case 'applications':
        applicationStore.getApplications({ $skip: ((page.value * 20) - 20), $top: 20 })
        break
      case 'onboarded':
        applicationStore.getApplications({ $skip: ((page.value * 20) - 20), $top: 20,  onboarding: true })
        break
      case 'approved':
        applicationStore.getApplications({ $skip: ((page.value * 20) - 20), $top: 20,  approved: true })
        break
      case 'hrreviewed':
        applicationStore.getApplications({ $skip: ((page.value * 20) - 20), $top: 20, hrReviewed: true })
        break
      default:
        console.log('Unknown')
        break
    }
  } catch (error) {
    useToast().error('We ran into an error!')
  }
}

function getConsortium(item) {
  try {
    const result = route.name === 'onboarded' ?  item?.onboardingConsortiaName: item?.approvedByConsortiaName;
    return result.substring(0,2).toString().toUpperCase();

  } catch (error) {
    console.error(error)
    // useToast().error('We ran into an error!')
  }
}

function getConsortiumFullName(item) {
  try {
    return route.name === 'onboarded' ? item?.onboardingConsortiaName :  item?.approvedByConsortiaName;

  } catch (error) {
    console.error(error)
    // useToast().error('We ran into an error!')
  }
}
setupStore.getCouties()

// EVENTS
</script>

<style lang="scss" scoped>
</style>