<template>
  <v-card elevation="0" style="width: 100%; padding-inline: 0 !important">
    <v-card-title>
      <v-toolbar>
        <v-toolbar-items>
          <v-btn
            icon
            @click="
              () =>
                applicantQuickView ? globalStore.setQuickViewScreen(false, {}) : navigateBack()
            "
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title class="headline" v-if="!applicantQuickView"
          >Hostel Request Details</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <span>
          Status:
          <v-chip
            class="px-4 mr-4"
            :color="ColorHelper.colorsHelper(`status${profile?.status?.trim()}`)"
            >{{ profile?.status }}</v-chip
          >
        </span>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="col-navigation" v-if="!applicantQuickView">
          <div class="navigation-container" :key="uniqueId">
            <div>
              <v-btn
                variant="plain"
                @click="() => navigateApplication('prev')"
                :disabled="!currentIndex || currentIndex === 0"
              >
                <v-icon>mdi-skip-previous</v-icon>
                <span>Previous</span>
              </v-btn>
            </div>
            <div>
              <v-btn
                variant="plain"
                @click="() => navigateApplication('next')"
                :disabled="currentIndex === null || applicationsSize - currentIndex === 1"
              >
                <span>NEXT</span>
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="quick-view-container">
            <ProfileLayout />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useApplication, useGlobalStore, useProfile } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import ColorHelper from '@/util/ColorHelper'
import ProfileLayout from '@/packages/profile/views/ProfileLayout.vue'

// ROUTES
const route = useRoute()
const router = useRouter()
const applicantId = ref(route?.params?.id || null)

// STORE
const applicationStore = useApplication()
const globalStore = useGlobalStore()
const profileStore = useProfile()
applicantId.value && applicationStore.getApplicant(applicantId.value)
const { applicant, applications, filteredApplication } = storeToRefs(applicationStore)
const { activeCommentable, applicantQuickView } = storeToRefs(globalStore)
const { profile } = storeToRefs(profileStore);

// VARS
const applicationsSize = filteredApplication.value.length ?? applications.value?.length
const currentIndex = ref(null)
const uniqueId = ref(10002)

// INJECT STATE
// const customError = inject('customError')

// COMPUTED

// WATCH EFFECTS:
watch(
  () => currentIndex.value,
  (index) => {
    uniqueId.value = index
  }
)
watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      applicantId.value = id
    }
  }
)
watch(
  () => applicantId.value,
  async (id) => {
    if (id) {
      await applicationStore.getApplicant(id)
    }
  }
)

watch(
  () => [applications.value, applicantId.value],
  () => {
    if (applicantId.value && applications.value && applications.value.length > 0) {
      const currentDataSource = filteredApplication.value?.length
        ? filteredApplication.value
        : applications.value
      const findIndex = currentDataSource.findIndex((app) => app.id === atob(applicantId.value))
      if (findIndex !== -1) {
        currentIndex.value = findIndex
      } else {
        const currentQueryValue = route.query?.queue
        let routeName = ''
        switch (currentQueryValue) {
          case 'applications':
            routeName = 'applications'
            break
          case 'onboarded':
            routeName = 'onboarded'
            break
          case 'approved':
            routeName = 'approved'
            break
          case 'hrreviewed':
            routeName = 'hrreviewed'
            break
        }
        router.push({
          name: routeName,
          query: { queue: currentQueryValue }
        })
      }
    }
  },
  { immediate: true }
)

watch(
  () => activeCommentable.value,
  (commentable) => {
    if (Object.keys(commentable).length) {
      globalStore.fetchFeedbackHistory({ documentNo: commentable.no })
    }
  },
  { immediate: true, deep: true }
)

// HOOKS
onMounted(() => {})
// onMounted(() => {
//   switch (route.query?.queue) {
//     case 'applications':
//       applicationStore.getApplicationsSync({ offset: 1, limit: 20 })
//       break
//     case 'onboarded':
//       applicationStore.getApplicationsSync({ offset: 1, limit: 20, onboarding: true })
//       break
//     case 'approved':
//       applicationStore.getApplicationsSync({ offset: 1, limit: 20, approved: true })
//       break
//     case 'hrreviewed':
//       applicationStore.getApplicationsSync({ offset: 1, limit: 20, hrReviewed: true })
//       break
//     default:
//       console.log('Unknown')
//       break
//   }
// })

// COMPONENT METHODS
function navigateApplication(type) {
  try {
    const navigationgList = filteredApplication.value?.length
      ? filteredApplication.value
      : applications.value
    switch (type) {
      case 'prev':
        applicationStore.$patch({
          applicant: currentIndex.value && navigationgList[currentIndex.value - 1]
        })
        break
      case 'next':
        applicationStore.$patch({
          applicant: currentIndex.value !== null && navigationgList[currentIndex.value + 1]
        })
        break
      default:
        break
    }
  } catch (error) {
    useToast().error(error.message)
  } finally {
    const currentQueryValue = route.query?.queue
    router.push({
      name: 'application',
      params: { id: btoa(applicant.value?.id) },
      query: { queue: currentQueryValue }
    })
  }
}

function navigateBack() {
  try {
    const currentQueryValue = route.query?.queue
    if (!currentQueryValue) return router.back()
    let routeName = ''
    switch (currentQueryValue) {
      case 'applications':
        routeName = 'applications'
        break
      case 'onboarded':
        routeName = 'onboarded'
        break
      case 'approved':
        routeName = 'approved'
        break
      case 'hrreviewed':
        routeName = 'hrreviewed'
        break
    }
    return router.push({
      name: routeName,
      query: { queue: currentQueryValue }
    })
  } catch (error) {
    useToast().error(error.message)
  }
}
</script>
<style scoped>
.col-navigation {
  padding-inline: 0px !important;
}
</style>
