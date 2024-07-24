<template>
  <v-card elevation="0">
    <v-card-title>
      <v-toolbar>
        <v-app-bar-nav-icon @click="drawer =!drawer" />
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
            <template v-slot:[`item.name`] ="{item}">
               {{  item.Biodatum.firstName + " " +item.Biodatum.middleName+  " " + item.Biodatum.lastName }}
            </template>
            <template v-slot:[`item.gender`] ="{item}">
               {{  item.Biodatum.gender }}
            </template>
            <template v-slot:[`item.age`] ="{item}">
               {{  DateUtil.calculateAge(item.Biodatum.dob) }}
            </template>
            <template v-slot:[`item.countyOfOrigin`]="{item}">
               {{  counties.find(c => c.CountyNo === item.Biodatum.countyOfOrigin)?.countyName }}
            </template>
            <template v-slot:[`item.category`]="{item}">
               {{  categories.find(ca => ca.code === item.Biodatum.profession)?.description }}
            </template>
            <template v-slot:[`item.createdAt`]="{item}">
               {{  DateUtil.toDate(item.createdAt) }}
            </template>
            <template v-slot:[`item.dateModified`]="{item}">
               {{  DateUtil.toDate(item.updatedAt) }}
            </template>
            <template v-slot:[`item.actions`] ="{item}">
              <v-btn
              color="primary"
              @click="viewApplication(item)"
              >
                <v-icon class="mr-2">mdi-file-eye</v-icon>
                <span>view</span>
              </v-btn>
            </template>
        </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useApplication, useSetupStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import DateUtil from '@/util/DateUtil';



// ROUTES
const router = useRouter();


const selected = ref([]);
const headers = [
  { title: 'Applicant Name', value: 'name' },
  { title: 'Gender', value: 'gender' },
  { title: 'Age', value: 'age' },
  { title: 'Status', value: 'status' },
  { title: 'County of Origin', value: 'countyOfOrigin' },
  { title: 'Category', value: 'category' },
  { title: 'Date Submitted', value: 'createdAt' },
  { title: 'Date Modified', value: 'dateModified' },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication();
const setupStore = useSetupStore();


// STATE & GETTERS
const { applications } = storeToRefs(applicationStore);
const { counties, categories } = storeToRefs(setupStore);

// METHODS
function viewApplication(item) {
    try {
        router.push({name: "application", params: {id: btoa(item.id)}});
    } catch (error) {
        useToast().error(error.message);
    }
}


// STORE ACTIONS
applicationStore.getApplications({ offset: 1, limit: 10 });
setupStore.getCouties()
</script>

<style lang="scss" scoped>
</style>