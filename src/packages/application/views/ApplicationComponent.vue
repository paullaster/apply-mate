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
            <template v-slot:[`item.createdAt`]="{item}">
               {{  DateUtil.toDate(item.createdAt) }}
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
import { useApplication } from '@/stores'
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
  { title: 'Status', value: 'status' },
  { title: 'Date Submitted', value: 'createdAt' },
  { title: 'Actions', value: 'actions', sortable: false }
]

// STORE
const applicationStore = useApplication();


// STATE & GETTERS
const { applications } = storeToRefs(applicationStore);
console.log(applications.value);

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
</script>

<style lang="scss" scoped>
</style>