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
        <v-btn
          :disabled="!selected.length"
          @click="batchAcceptApplications"
          :color="ColorHelper.colorsHelper('success')"
          variant="flat"
          class="mr-4"
          v-if="route.query.queue === 'applications' && user.role.toLowerCase() !== 'hr'"
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
          v-if="route.query.queue !== 'approved' && user.role.toLowerCase() !== 'hr'"
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
          v-if="route.query.queue === 'onboarded' && user.role.toLowerCase() !== 'hr'"
        >
          <v-icon class="mr-2">mdi-file-multiple-outline</v-icon>
          <span>Approve Applications</span>
        </v-btn>
        <v-btn
          :disabled="!selected.length"
          @click="batchHRReviewApplications"
          :color="ColorHelper.colorsHelper('primary')"
          variant="flat"
          class="mr-4"
          v-if="user.role.toLowerCase() === 'hr' && route.query.queue === 'approved'"
        >
          <v-icon class="mr-2">mdi-flash</v-icon>
          <span>HR Review</span>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="filteredApplication.length || isAnyQueryParam ? filteredApplication : applications"
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
            v-tooltip="'Application Quick View'"
            >
            <v-icon :color="ColorHelper.colorsHelper('success')" size="30">mdi-flash</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            icon
            @click="() => globalStore.setFeedbackActionDialog(true, item)"
            class="my-2 mx-1"
            v-tooltip="'Leave Feedback for this Application'"
          >
            <v-icon :color="ColorHelper.colorsHelper('info')" size="30">mdi-comment-quote</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            icon
            hint="view application"
            @click="viewApplication(item)"
            class="my-2 mx-1"
            v-tooltip="'View Application Details'"
          >
            <v-icon :color="ColorHelper.colorsHelper('primary')" size="30">mdi-file-eye</v-icon>
          </v-btn>
          </div>
        </template>
      </v-data-table>
      <v-divider></v-divider>
      <div class="text-right" style="padding: 0.4rem 0; display: flex; justify-content: flex-end">
        <v-pagination
          v-model="page"
          :length="totalItemsCount"
          :total-visible="7"
          next-icon="mdi-skip-next"
          prev-icon="mdi-skip-previous"
          variant="flat"
          previous-aria-label="Previous"
          density="comfortable"
          :active-color="ColorHelper.colorsHelper('accent')"
          @update:modelValue="onModalChange"
          @first="onFirstPage"
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
import { useApplication, useSetupStore, useAuth, useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { inject, onMounted, ref, watch } from 'vue'
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
  { title: 'Disabled', value: 'disabled', sortable: true },
  {
    title: 'Category',
    value: 'category',
    sortable: true
  },
  { title: 'Approved By', value: 'approvedByConsortia', sortable: true, aligne: 'center' },
  { title: 'Date Modified', value: 'modifiedAt', sortable: true },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication()
const setupStore = useSetupStore()
const authStore = useAuth()
const globalStore = useGlobalStore()

// STATE & GETTERS
const { applications, filteredApplication, totalItemsCount } = storeToRefs(applicationStore)
const { counties, categories } = storeToRefs(setupStore)
const { loading, searchQuery, activeCommentable } = storeToRefs(globalStore)
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

// WATCH
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
      if (query[prop] || query[prop] !== '') {
        isAnyQueryParam.value = true
        return
      } else {
        isAnyQueryParam.value = false
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
        applicationStore.getApplications({ offset: 1, limit: 20 })
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
        onModalChange()
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

function batchHRReviewApplications() {
  try {
    globalStore.setLoader(true)
    if (!selected.value.length) {
      useToast().error('No applications selected')
      return globalStore.setLoader(false)
    }
    const reviewableApplications = selected.value.filter((app) => app.status === 'Approved')
    if (!reviewableApplications.length) {
      return globalStore.setLoader(false)
    }

    applicationStore
      .batchHRReviewedApplication(reviewableApplications.map((app) => app.no))
      .then((res) => {
        useToast().success(res?.message)
        globalStore.setLoader(false)
        onModalChange()
        
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
        onModalChange()
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

function resetApplicationList() {
  try {
    applicationStore.$patch({ filteredApplication: [] })
    globalStore.$patch({
      searchQuery: {
        searchText: '',
        county: '',
        category: ''
      }
    })
    isAnyQueryParam.value = false
  } catch (error) {
    useToast().error('We ran into an error!')
  }
}

function onFirstPage(){
  try {
    globalStore.$reset()
    applicationStore.$patch({
      filteredApplication: [],
    })
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
        case 'hrreviewed':
          applicationStore.getApplications({ $top: 20, hrReviewed: true })
          break
        default:
          console.log('Unknown')
      }
  } catch (error) {
    useToast().error('We ran into an error!');
  }
}

function onModalChange() {
  try {
    globalStore.$reset()
    applicationStore.$patch({
      filteredApplication: [],
    })
    if (Number(page.value) === 1) {
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
    const result = route.name === 'onboarded' ?  item?.onboardingConsortiaName.split(' ') : item?.approvedByConsortiaName.split(' ');
    return result[0][0] + result[1][0];

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