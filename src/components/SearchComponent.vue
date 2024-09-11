<template>
  <v-row flex>
    <v-dialog v-model="searchDialog" max-width="800px" min-height="auto">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12"> <span> Search for a applicant(s)</span></v-col>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="Search by application number, applicant name"
                v-model="searchQuery.searchText"
                @update:modelValue="search"
              ></v-text-field>
            </v-col>
            
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="searchDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useGlobalStore, useApplication } from '@/stores'
import { storeToRefs } from 'pinia'


// STORE
const globalStore = useGlobalStore()
const applicationStore = useApplication()
const { searchDialog, searchQuery } = storeToRefs(globalStore)
const { applications, filteredApplication } = storeToRefs(applicationStore)

defineProps({
  propertiesArray: Array
})

// COMPONENT State

function search() {
  try {
    applicationStore.$patch({
      currentPage: 1
    })
    const matchedApplications =
      filteredApplication.value.length &&
      (searchQuery.value.searchText !== '' || searchQuery.value.searchText)
        ? filteredApplication.value?.filter((app) => {
            return (
              app.no.toString().includes(searchQuery.value.searchText) ||
              app.fullName
                .toString()
                .toLowerCase()
                .includes(searchQuery.value.searchText.toLowerCase())
            )
          })
        : applications.value?.filter((app) => {
            return (
              app.no.toString().includes(searchQuery.value.searchText) ||
              app.fullName
                .toString()
                .toLowerCase()
                .includes(searchQuery.value.searchText.toLowerCase())
            )
          })
    applicationStore.$patch({
      filteredApplication: matchedApplications,
      itemCountOnQuery: matchedApplications.length,
      currentPage: 1
    })
  } catch (error) {
    console.error(error.message)
  }
}


</script>

<style scoped>
.dialog-card {
  height: 100% !important;
  background-color: red !important;
}
</style>