<template>
  <v-card elevation="0" style="width: 100%; padding-inline: 0 !important">
    <v-card-title>
      <v-toolbar>
        <v-toolbar-items>
          <v-btn icon @click="()=> applicantQuickView ? globalStore.setQuickViewScreen(false, {}) : navigateBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title class="headline" v-if="!applicantQuickView">Applicant Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <span>
          Status:
          <v-chip
            class="px-4 mr-4"
            :color="ColorHelper.colorsHelper(`status${applicant?.status?.trim()}`)"
            >{{ applicant?.status }}</v-chip
          >
        </span>
        <v-btn
          :color="ColorHelper.colorsHelper('primary')"
          variant="flat"
          class="mr-2"
          :disabled="user.role !== 'lead'"
          @click="reopenApplication"
          v-if="applicant?.status?.trim() === 'Onboarded'"
        >
          <v-icon class="mr-2">mdi-arrow-u-left-top</v-icon>
          Reopen application
        </v-btn>
        <v-btn
          :color="ColorHelper.colorsHelper('primary')"
          variant="flat"
          class="mr-2"
          @click="hrReviewApplication"
          v-if="route.query.queue === 'approved' &&  user.role.toLowerCase() === 'hr'"
        >
          <v-icon class="mr-2"> mdi-flash</v-icon>
          Hr Review
        </v-btn>
        <v-btn
          :color="ColorHelper.colorsHelper('info')"
          variant="flat"
          class="mr-2"
          @click="globalStore.setFeedbackActionDialog(true, applicant)"
        >
          <v-icon class="mr-2">mdi-message-bulleted</v-icon>
          Leave a feedback
        </v-btn>
        <v-btn
          :color="ColorHelper.colorsHelper('primary')"
          variant="flat"
          class="mr-2"
          :disabled="applicant?.status?.trim() !== 'New'"
          v-if="
          route.query.queue === 'applications' &&
           applicant?.status?.trim() === 'New' &&
           user.role.toLowerCase() !== 'hr' "
          @click="acceptApplication"
        >
          <v-icon class="mr-2">mdi-check-decagram-outline</v-icon>
          accept application
        </v-btn>
        <v-btn
          :color="ColorHelper.colorsHelper('primary')"
          variant="flat"
          class="mr-2"
          :disabled="user.role !== 'lead'"
          v-if="route.query.queue === 'onboarded' && applicant?.status?.trim() === 'Onboarded'"
          @click="onboardApplication"
        >
          <v-icon class="mr-2">mdi-check-decagram-outline</v-icon>
          Approve application
        </v-btn>
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
        <v-col cols="12" md="6">
          <v-card elevation="1">
            <v-card-title>Personal Information</v-card-title>
            <v-card-text>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Name:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.fullName }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Age:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.age }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Gender:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>
                      {{ applicant?.gender }}
                    </v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12"> Email: </v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.eMail }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Phone:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12"
                    ><v-chip>
                      {{ applicant?.phone }}
                    </v-chip></v-col
                  >
                </v-row>
              </div>
              <!-- Add more fields as needed -->
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="1">
            <v-card-title>Address Details</v-card-title>
            <v-card-text>
              <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12">County of residence:</v-col>
                  <v-col cols="12" lg="4" md="12" sm="12">
                    <v-chip>{{
                      counties.find((c) => c.CountyNo === applicant?.countyOfResidence)?.countyName
                    }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12">Constituency:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.constituency }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12"> City: </v-col>
                  <v-col cols="12" lg="4" md="12" sm="12">
                    <v-chip> {{ applicant?.city }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12">Estate:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.estate }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12">Apartment/Flat/Village:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.village }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-container fluid style="width: 100%; padding-inline: 0 !important">
        <v-row>
          <!-- Vertical Tabs -->
          <v-col cols="12" lg="3" md="12" sm="12">
            <v-tabs v-model="tab" color="primary" direction="vertical">
              <v-tab v-for="(tab, i) in tabs" :key="i" :text="tab.text" :value="tab.name"></v-tab>
            </v-tabs>
          </v-col>
          <v-divider vertical></v-divider>
          <!-- Tab Content -->
          <v-col cols="12" lg="9" md="12" sm="12" style="width: 100%; padding-inline: 0 !important">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="Biodatum">
                <BiodataComponent :item="applicant?.biodata" />
              </v-tabs-window-item>
              <v-tabs-window-item value="ProfessionalBodies">
                <v-data-table
                  :headers="professionalBodiesHeaders"
                  :items="applicant?.professionalBody"
                >
                </v-data-table>
              </v-tabs-window-item>
              <v-tabs-window-item value="Education">
                <v-data-table :headers="educationHeaders" :items="applicant?.education">
                  <template v-slot:[`item.startDate`]="{ item }">
                    <span>{{ new Date(item.startDate).getFullYear() }}</span>
                  </template>
                  <template v-slot:[`item.graduationDate`]="{ item }">
                    <span>{{ new Date(item.graduationDate).getFullYear() }}</span>
                  </template>
                </v-data-table>
              </v-tabs-window-item>
              <v-tabs-window-item value="WorkExperience">
                <v-data-table :headers="workExperienceHeaders" :items="[applicant?.experience]">
                  <template v-slot:[`item.nameOfFirm`]="{ item }">
                    <span>{{ item?.nameOfFirm?.toUpperCase() }}</span>
                  </template>
                  <template v-slot:[`item.positionHeld`]="{ item }">
                    <span>{{ item?.positionHeld?.toUpperCase() }}</span>
                  </template>
                </v-data-table>
              </v-tabs-window-item>
              <v-tabs-window-item value="Essay">
                <EssayView :Essay="applicant.biodata?.essay" />
              </v-tabs-window-item>
              <v-tabs-window-item value="Attachments">
                <v-data-table
                  :headers="attachmentsHeaders"
                  :items="applicant?.applicationAttachments"
                >
                  <template v-slot:[`item.name`]="{ item }">
                    <span>{{ item.name.toUpperCase() }}</span>
                  </template>
                  <template v-slot:[`item.attachmentType`]="{ item }">
                    <span>{{
                      item.link?.split('.')[item.link?.split('.').length - 1].toUpperCase()
                    }}</span>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                      @click="() => downloadFile(item.link, item.name)"
                      :color="ColorHelper.colorsHelper('secondary')"
                      class="mr-3 mb-3"
                    >
                      <v-icon>mdi-cloud-download</v-icon>
                      <span>Download</span>
                    </v-btn>
                    <v-btn
                      @click="viewFile(item)"
                      :color="ColorHelper.colorsHelper('primary')"
                      class="mr-3 mb-3"
                      v-if="
                        item.link?.split('.')[item.link?.split('.').length - 1].toUpperCase() ===
                        'PDF'
                      "
                    >
                      <v-icon>mdi-eye-circle</v-icon>
                      <span>View</span>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <ViewDocument />
  <FeedbackActions />
</template>

<script setup>
import { useApplication, useSetupStore, useGlobalStore, useAuth } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch, inject } from 'vue'
import EssayView from './EssayView.vue'
import BiodataComponent from './BiodataComponent.vue'
import ViewDocument from '@/components/ViewDocument.vue'
import { useToast } from 'vue-toastification'
import ColorHelper from '@/util/ColorHelper'
import FeedbackActions from '@/components/FeedbackActions.vue'

// REFS
const tab = ref()
const tabs = [
  { name: 'Biodatum', text: 'Biodata' },
  { name: 'ProfessionalBodies', text: ' Professional Bodies ' },
  { name: 'Education', text: 'Education' },
  { name: 'WorkExperience', text: 'Work Experience' },
  { name: 'Essay', text: 'Essay' },
  { name: 'Attachments', text: 'Attachments' }
]

// ROUTES
const route = useRoute()
const router = useRouter()
const applicantId = ref(route?.params?.id || null)

// STORE
const applicationStore = useApplication()
const setupStore = useSetupStore()
const globalStore = useGlobalStore()
const authStore = useAuth()
applicantId.value && applicationStore.getApplicant(applicantId.value)
const { applicant, applications, filteredApplication, currentPage:page } = storeToRefs(applicationStore)
const { counties } = storeToRefs(setupStore)
const { user } = storeToRefs(authStore)
const { activeCommentable, applicantQuickView } = storeToRefs(globalStore)

// VARS
const applicationsSize = filteredApplication.value.length ?? applications.value?.length
const currentIndex = ref(null)
const uniqueId = ref(10002)

// INJECT STATE
const customError = inject('customError')

const educationHeaders = [
  {
    title: 'Level',
    value: 'level'
  },
  {
    title: 'Degree',
    value: 'qualificationDescription'
  },
  {
    title: 'Institution',
    value: 'institution'
  },
  {
    title: 'Year of start',
    value: 'startDate'
  },
  {
    title: 'Year of graduation',
    value: 'graduationDate'
  }
]
const professionalBodiesHeaders = [
  {
    title: 'Professional body',
    value: 'bodyName'
  },
  {
    title: 'Membership No.',
    value: 'membershipNumber'
  },
  {
    title: 'Membership Type',
    value: 'membershipType'
  }
]

const attachmentsHeaders = [
  {
    title: 'Attachment Name',
    value: 'name'
  },
  {
    title: 'Attachment Type',
    value: 'attachmentType'
  },
  {
    title: 'Actions',
    value: 'actions'
  }
]

const workExperienceHeaders = [
  {
    title: 'Company',
    value: 'nameOfFirm'
  },
  {
    title: 'Position',
    value: 'positionHeld'
  },
  {
    title: 'Job Description',
    value: 'responsibilitiesDescription'
  }
]

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
      : applications.value;
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
  ()=>activeCommentable.value,
  (commentable)=>{
    if(Object.keys(commentable).length) {
      globalStore.fetchFeedbackHistory({documentNo: commentable.no})
    }
  },
  {immediate: true, deep: true}
)

// HOOKS
onMounted(() => {
  switch (route.query?.queue) {
    case 'applications':
      applicationStore.getApplicationsSync({ offset: 1, limit: 10 })
      break
    case 'onboarded':
      applicationStore.getApplicationsSync({ offset: 1, limit: 10, onboarding: true })
      break
    case 'approved':
      applicationStore.getApplicationsSync({ offset: 1, limit: 10, approved: true })
      break
    case 'hrreviewed':
      applicationStore.getApplicationsSync({ offset: 1, limit: 10, hrReviewed: true })
      break
    default:
      console.log('Unknown')
      break
  }
})

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
function downloadFile(link, name, type = 'PDF') {
  try {
    globalStore.setLoader(true)
    switch (type) {
      case 'PDF':
        link = `${link}?type=preview`
        break
      default:
        link = `${link}?type=download`
        break
    }
    const a = document.createElement('a')
    a.href = link
    a.target = '_blank'
    a.download = name
    a.click()
    globalStore.setLoader(false)
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  }
}

function viewFile(item) {
  try {
    const dialog = {
      status: true,
      document: item
    }
    globalStore.setDocumentViewerDialog(dialog)
    return
  } catch (error) {
    useToast().error(error.message)
  }
}

async function acceptApplication() {
  try {
    globalStore.setLoader(true)
    if (applicant.value?.status.trim() === 'New') {
      const payload = {
        no: applicant.value.no
      }
      if (!payload['no']) {
        globalStore.setLoader(false)
        useToast().error(
          `Sorry!, We can't process this application at this time, PLease try again later!`
        )
        return
      }
      applicationStore
        .acceptApplicant(payload)
        .then((res) => {
          globalStore.setLoader(false)
          useToast().success(res.message)
          return applicantQuickView ?
          (
            globalStore.setQuickViewScreen(false, {}),
            updateAdampter()
          ) :
          navigateApplication('next');
        })
        .catch((error) => {
          globalStore.setLoader(false)
          useToast().error(error?.response?.data?.message || error.message || customError)
        })
    } else {
      globalStore.setLoader(false)
      useToast().error(`This application is already ${applicant.value?.status}`)
    }
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  }
}

async function onboardApplication() {
  try {
    globalStore.setLoader(true)
    if (applicant.value?.status.trim() === 'Onboarded') {
      const payload = {
        no: applicant.value.no
      }
      if (!payload['no']) {
        globalStore.setLoader(false)
        useToast().error(
          `Sorry!, We can't process this application at this time, PLease try again later!`
        )
        return
      }
      applicationStore
        .peerReviewApplication(payload)
        .then((res) => {
          globalStore.setLoader(false)
          useToast().success(res.message)
          return applicantQuickView ?
          (
            globalStore.setQuickViewScreen(false, {}),
            updateAdampter()
          ) :
          navigateApplication('next');
        })
        .catch((error) => {
          globalStore.setLoader(false)
          useToast().error(error?.response?.data?.message || error.message || customError)
        })
    } else {
      globalStore.setLoader(false)
      useToast().error(`This application is already ${applicant.value?.status}`)
    }
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  }
}

async function hrReviewApplication() {
  try {
    globalStore.setLoader(true)
    if (applicant.value?.status.trim() === 'Approved') {
      const payload = {
        no: applicant.value.no
      }
      if (!payload['no']) {
        globalStore.setLoader(false)
        useToast().error(
          `Sorry!, We can't process this application at this time, PLease try again later!`
        )
        return
      }
      applicationStore
        .hrReviewApplication(payload)
        .then((res) => {
          globalStore.setLoader(false)
          useToast().success(res.message)
          return applicantQuickView ? 
          (
            globalStore.setQuickViewScreen(false, {}),
            updateAdampter() 
          ) :
           navigateApplication('next');
          
        })
        .catch((error) => {
          globalStore.setLoader(false)
          useToast().error(error?.response?.data?.message || error.message || customError)
        })
    } else {
      globalStore.setLoader(false)
      useToast().error(`This application is already ${applicant.value?.status}`)
    }
  } catch (error) {
    globalStore.setLoader(false)
    useToast().error(error.message)
  }
}

function reopenApplication() {
  try {
    globalStore.setLoader(true)
    if (applicant.value?.onboardedBy.trim() === user.value?.consoltium.trim()) {
      if (applicant.value?.status.trim() === 'Onboarded') {
        const payload = {
          no: applicant.value.no
        }
        if (!payload['no']) {
          globalStore.setLoader(false)
          useToast().error(
            `Sorry!, We can't process this application at this time, PLease try again later!`
          )
          return
        }
        applicationStore
          .reverseOnboardedApplication(payload)
          .then(async(res) => {
            globalStore.setLoader(false)
            useToast().success(res.message)
            await applicationStore.getApplicant(applicantId.value)
          })
          .catch((error) => {
            globalStore.setLoader(false)
            console.log(error)
            useToast().error(customError)
          })
      } else {
        globalStore.setLoader(false)
        useToast().error(`This application is application is ${applicant.value?.status}`)
      }
    } else {
      globalStore.setLoader(false)
      useToast().info(
        'You can not reopen this application because it was accepted by another consortium other than yourself.'
      )
      return
    }
  } catch (error) {
    globalStore.setLoader(false)
    console.log(error.message)
    useToast().error('Sorry!, We ran into an error!, Please try again later.')
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

function updateAdampter() {
  try {
    switch (route.query?.queue) {
      case 'applications':
        applicationStore.getApplicationsSync({ $skip: ((page.value * 10) - 10), $top: 10 })
        break
      case 'onboarded':
        applicationStore.getApplicationsSync({ $skip: ((page.value * 10) - 10), $top: 10,  onboarding: true })
        break
      case 'approved':
        applicationStore.getApplicationsSync({ $skip: ((page.value * 10) - 10), $top: 10,  approved: true })
        break
      case 'hrreviewed':
        applicationStore.getApplicationsSync({ $skip: ((page.value * 10) - 10), $top: 10, hrReviewed: true })
        break
    default:
      console.log('Unknown')
      break
  }
  } catch (error) {
    console.log(error);
  }
}
</script>
<style scoped>
.col-navigation {
  padding-inline: 0px !important;
}
</style>
