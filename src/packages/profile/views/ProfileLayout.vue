<template>
  <v-app>
    <v-main style="width: 84vw">
      <v-sheet color="white" elevation="0" rounded="lg" height="fit-content">
        <v-tabs
          v-model="activeProfileTab"
          :items="profileSections"
          align-tabs="center"
          :color="ColorHelper.colorsHelper('primary')"
          slider-color="#f78166"
          grow
        >
          <template v-slot:tab="{ item }">
            <v-tab
              :prepend-icon="item.icon"
              :text="item.title"
              :value="item.value"
              class="text-none"
              style="
                  background-color: #FEFCFF;
              "
            ></v-tab>
          </template>
          <template v-slot:item="{ item }">
            <!-- min-height: 95vh; -->
            <v-tabs-window-item
              :value="item.value"
              class="pa-4"
              style="display: flex; justify-content: center; align-items: center"
            >
              <div class="d-flex align-center justify-center" style="width: 80%">
                <v-container>
                  <v-card elevation="0" style="text-align: justify">
                    <h2>{{ item.heading }}</h2>
                    <p>{{ item.description }}</p>
                    <v-divider style="margin: 1.2rem 0"></v-divider>
                    <BiodataComponent v-if="activeProfileTab === 'BIODATA'" />
                    <ContactPerson v-if="activeProfileTab === 'CONTACT_INFO'" />
                    <AccommodationComponent v-if="activeProfileTab === 'ACCOMMODATION_INFO'" />
                    <LandDetails v-if="activeProfileTab === 'LAND_INFO'" />
                    <DeclarationForm v-if="activeProfileTab === 'DECLARATION_FORM'" />
                    <SigningForm v-if="activeProfileTab === 'SIGN_FORM'" />
                  </v-card>
                </v-container>
              </div>
            </v-tabs-window-item>
          </template>
        </v-tabs>
      </v-sheet>
      <v-row
        style="display: flex; justify-content: center; align-items: center; padding-inline: 12.8rem"
      >
        <v-col cols="12" class="d-flex justify-space-between">
          <v-btn text @click="$router.push({ name: 'home' })" class="mb-2" width="150px">
            <v-icon class="mr-2">mdi-step-backward</v-icon>
            <span>Previous</span>
          </v-btn>
          <v-btn
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"
            @click="saveProfileSection"
            class="mb-2"
            min-width="150px"
          >
            <v-icon class="mr-2"> mdi-content-save-outline </v-icon>
            <span>{{ saveButtonLabel }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-main>
    <DialogComponent />
  </v-app>
</template>

<script setup>
import BiodataComponent from '../components/BiodataComponent.vue'
import ContactPerson from '../components/ContactPerson.vue'
import AccommodationComponent from '../components/AccommodationComponent.vue'
import LandDetails from '../components/LandDetails.vue'
import DeclarationForm from '../components/DeclarationForm.vue'
import SigningForm from '../components/SigningForm.vue'
import { useProfile } from '@/stores'
import { storeToRefs } from 'pinia'
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import ColorHelper from '@/util/ColorHelper'
import DialogComponent from '../components/DialogComponent.vue'

// ROUTING
const router = useRouter()

// STORES
const profileStore = useProfile()
const { profileSections, activeProfileTab } = storeToRefs(profileStore)

// COMPUTED
const saveButtonLabel = computed(() => {
  switch (activeProfileTab.value) {
    case 'BIODATA':
      return 'Save Institution Information'
    case 'CONTACT_INFO':
      return 'Save Contact Information'
    case 'ACCOMMODATION_INFO':
      return 'Save Accommodation Information'
    case 'LAND_INFO':
      return 'Save Land Information'
    case 'DECLARATION_FORM':
      return 'Save Declaration Form'
    case 'SIGN_FORM':
      return 'Submit Signed Application Form'
    default:
      return 'NEXT'
  }
})
// WATCHERS
watch(
  () => activeProfileTab.value,
  (value) => {
    router.push({
      name: value.toLowerCase()
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// METHODS
function saveProfileSection() {
  console.log('saved')
}
</script>
