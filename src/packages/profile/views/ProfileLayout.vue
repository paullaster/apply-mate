<template>
  <v-app>
    <v-main style="width: 100vw">
      <v-sheet color="white" elevation="3" rounded="lg" min-height="100vh">
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
            ></v-tab>
        </template>
        <template v-slot:item="{ item }">
            <v-tabs-window-item :value="item.value" class="pa-4"
             style="
             min-height: 95vh;
             display: flex;
             justify-content: center;
             align-items: center;
             ">
              <div class="d-flex align-center justify-center" style="width:80%;">
                <v-container>
                  <BiodataComponent v-if="activeProfileTab === 'BIODATA'"/>
                  <ContactPerson v-if="activeProfileTab === 'CONTACT_INFO'" />
                  <AccommodationComponent  v-if="activeProfileTab === 'ACCOMMODATION_INFO'" />
                  <LandDetails v-if="activeProfileTab === 'LAND_INFO'" />
                  <DeclarationForm v-if="activeProfileTab === 'DECLARATION_FORM'" />
                  <SigningForm v-if="activeProfileTab === 'SIGN_FORM'" />
                </v-container>
              </div>
            </v-tabs-window-item>
          </template>
        </v-tabs>
      </v-sheet>
    </v-main>
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
import { watch } from 'vue'
import {  useRouter } from 'vue-router'
import ColorHelper from '@/util/ColorHelper'

// ROUTING
const router = useRouter()

// STORES
const profileStore = useProfile()
const { profileSections, activeProfileTab } = storeToRefs(profileStore)

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
</script>
