<template>
  <v-card elevation="0" style="width:100%; padding-inline: 0 !important;">
    <v-card-title>
      <v-toolbar>
        <v-toolbar-items>
          <v-btn icon @click="() => router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title class="headline">Applicant Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="flat" class="mr-2">
          <v-icon class="mr-2">mdi-check-decagram-outline</v-icon>
          accept application
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="1">
            <v-card-title>Personal Information</v-card-title>
            <v-card-text>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Name:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{
                      applicant?.fullName
                    }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Date of Birth:</v-col>
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
                  <v-col cols="12" lg="2" md="12" sm="12">
                    Email:
                  </v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                    <v-chip>{{ applicant?.eMail }}</v-chip>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col cols="12" lg="2" md="12" sm="12">Phone:</v-col>
                  <v-col cols="12" lg="6" md="12" sm="12"><v-chip>
                    {{ applicant?.phone }}
                  </v-chip></v-col>
                </v-row></div>
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
                  <v-col cols="12" lg="4" md="12" sm="12"><v-chip>County of residence:</v-chip></v-col>
                  <v-col cols="12" lg="4" md="12" sm="12">
                      {{ counties.find(c => c.CountyNo === applicant?.countyOfResidence)?.countyName }}
                  </v-col>
                </v-row>
                 </div>
                 <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12"><v-chip>Constituency:</v-chip></v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                      {{ applicant?.constituency }}
                  </v-col>
                </v-row>
                 </div>
                 <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12"><v-chip>
                    City:
                  </v-chip></v-col>
                  <v-col cols="12" lg="4" md="12" sm="12">
                      {{ applicant?.city }}
                  </v-col>
                </v-row>
                 </div>
                 <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12"><v-chip>Estate:</v-chip></v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                      {{ applicant?.estate }}
                  </v-col>
                </v-row>
                 </div>
                 <div>
                <v-row>
                  <v-col cols="12" lg="4" md="12" sm="12"><v-chip>Apartment/Flat/Village:</v-chip></v-col>
                  <v-col cols="12" lg="6" md="12" sm="12">
                      {{ applicant?.village }}
                  </v-col>
                </v-row>
                 </div>
                 <div>
                
                 </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-container fluid style="width: 100%; padding-inline: 0 !important;">
        <v-row>
          <!-- Vertical Tabs -->
          <v-col cols="12" lg="3" md="12" sm="12">
            <v-tabs v-model="tab" color="primary" direction="vertical">
              <v-tab v-for="(tab, i) in tabs" :key="i" :text="tab.text" :value="tab.name"></v-tab>
            </v-tabs>
          </v-col>
          <v-divider vertical></v-divider>
          <!-- Tab Content -->
          <v-col cols="12" lg="9" md="12" sm="12" style="width: 100%; padding-inline: 0 !important;">
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
                </v-data-table>
              </v-tabs-window-item>
              <v-tabs-window-item value="WorkExperience">
                <v-data-table
                  :headers="workExperienceHeaders"
                  :items="[applicant?.experience]"
                >
                  <template v-slot:[`item.nameOfFirm`]="{ item }">
                    <span>{{ item.nameOfFirm.toUpperCase() }}</span>
                  </template>
                  <template v-slot:[`item.positionHeld`]="{ item }">
                    <span>{{ item.positionHeld.toUpperCase() }}</span>
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
                    <span>{{ item.link?.split('.')[item.link?.split('.').length - 1].toUpperCase() }}</span>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                      @click="() => downloadFile(item.link, item.name)"
                      color="secondary"
                      class="mr-3 mb-3"
                    >
                      <v-icon>mdi-cloud-download</v-icon>
                      <span>Download</span>
                    </v-btn>
                    <v-btn @click="viewFile(item)" color="primary" class="mr-3 mb-3">
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
</template>

<script setup>
import { useApplication, useSetupStore, useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import EssayView from './EssayView.vue'
import BiodataComponent from './BiodataComponent.vue'
import ViewDocument from '@/components/ViewDocument.vue'
import { useToast } from 'vue-toastification'

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

// VARS
const educationHeaders = [
  {
    title: 'Level',
    value: 'educationLevel'
  },
  {
    title: 'Degree',
    value: 'degree'
  },
  {
    title: 'Institution',
    value: 'institution'
  },
  {
    title: 'Year of start',
    value: 'yearOfStart'
  },
  {
    title: 'Year of graduation',
    value: 'yearOfGraduation'
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

// ROUTES
const route = useRoute()
const router = useRouter()
const applicantId = route?.params?.id || null

// STORE
const applicationStore = useApplication();
const setupStore = useSetupStore();
const globalStore = useGlobalStore();
applicantId && applicationStore.getApplicant(applicantId)


// COMPONENT METHODS
function viewFile(item) {
  try {
    const dialog = {
      status: true,
      document: item
    };
    globalStore.setDocumentViewerDialog(dialog); return;
  } catch (error) {
    useToast().error(error.message);
  }
}
const { applicant } = storeToRefs(applicationStore);
const {counties } = storeToRefs(setupStore);
</script>
