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
            <v-col cols="12">
              <v-select
                v-model="searchQuery.county"
                :items="countyList"
                item-title="countyName"
                item-value="CountyNo"
                label="Filter by county"
                @update:modelValue="sortByCounty"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="searchQuery.category"
                :items="route.name === 'applications' ? categoryList : categories"
                item-title="description"
                item-value="code"
                label="Filter by category"
                @update:modelValue="sortByCategory"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="searchQuery.consortium"
                :items="consortia"
                item-title="name"
                item-value="no"
                label="Filter by Consortium"
                @update:modelValue="sortByConsortium"
                clearable
                v-if="route.name === 'approved' && user.role.toLowerCase() === 'hr'"
              ></v-select>
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
import { useGlobalStore, useAuth, useSetupStore, useApplication } from '@/stores'
import Helpers from '@/util/Helpers'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// ROUTE
const route = useRoute()

// STORE
const globalStore = useGlobalStore()
const authStore = useAuth()
const setupStore = useSetupStore()
const applicationStore = useApplication()
const { searchDialog, searchQuery } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore)
const { counties, categories, consortia } = storeToRefs(setupStore)
const { applications, filteredApplication, searchedAgainstAPI } = storeToRefs(applicationStore)

defineProps({
  propertiesArray: Array
})

// COMPONENT State
const countyList = computed(() => {
  const countiesList = []
  user.value?.countiesFilter?.split('|').forEach((county) => {
    const countyExist = counties.value?.find((c) => county === c.CountyNo)
    if (countyExist) {
      countiesList.push({ CountyNo: countyExist.CountyNo, countyName: countyExist.countyName })
    }
  })
  return countiesList
})
const categoryList = computed(() => {
  const categoryList = []
  user.value?.categoriesFilter?.split('|').forEach((category) => {
    const categoryExist = categories.value?.find((ct) => category === ct.code)
    if (categoryExist) {
      categoryList.push({ code: categoryExist.code, description: categoryExist.description })
    }
  })
  return categoryList
})

function search() {
  try {
    applicationStore.$patch({
      currentPage: 1,
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
      itemCount: matchedApplications.length,
      currentPage: 1,
    })
  } catch (error) {
    console.error(error.message)
  }
}
function sortByCounty() {
  try {
    applicationStore.$patch({
      currentPage: 1,
    })
    if (!searchQuery.value.county) {
      applicationStore.$patch({
        filteredApplication: filteredApplication.value?.length
          ? filteredApplication.value
          : applications.value,
        itemCount: filteredApplication.value?.length
          ? filteredApplication.value.length
          : applications.value.length
      })
      return
    }
    searchedAgainstAPI.value = false
    const matchedApplications =
      filteredApplication.value.length && searchQuery.value.county
        ? filteredApplication.value?.filter((app) => {
            return (
              app.countyOfOrigin.toString().toLowerCase() ===
              searchQuery.value.county.toString().toLowerCase()
            )
          })
        : ((searchedAgainstAPI.value = true),
          applicationStore.applicationCustomFilter({
            county: searchQuery.value.county,
            category: searchQuery.value.category,
            status: Helpers.getStatusValueFilter(route.name)
          }))

    // applications.value?.filter((app) => {
    //   return searchQuery.value.county ?
    //   app.countyOfOrigin.toString().toLowerCase() === searchQuery.value.county.toString().toLowerCase()
    //   : app;
    // })
    if (!searchedAgainstAPI.value) {
      applicationStore.$patch({
        filteredApplication: matchedApplications,
        itemCount: matchedApplications.length,
        currentPage: 1
      })
    }
    // applicationStore.$patch({
    //   filteredApplication: matchedApplications,
    // })
  } catch (error) {
    console.error(error.message)
  }
}
function sortByCategory() {
  try {
    applicationStore.$patch({
      currentPage: 1,
    })
    if (!searchQuery.value.category) {
      applicationStore.$patch({
        filteredApplication: filteredApplication.value?.length
          ? filteredApplication.value
          : applications.value,
          itemCount: filteredApplication.value?.length
          ? filteredApplication.value.length
          : applications.value.length
      })
      return
    }
    searchedAgainstAPI.value = false
    const matchedApplications =
      filteredApplication.value?.length && searchQuery.value.category
        ? filteredApplication.value?.filter((app) => {
            return (
              app.category.toString().toLowerCase() ===
              searchQuery.value.category.toString().toLowerCase()
            )
          })
        : ((searchedAgainstAPI.value = true),
          applicationStore.applicationCustomFilter({
            county: searchQuery.value.county,
            category: searchQuery.value.category,
            status: Helpers.getStatusValueFilter(route.name)
          }))
    // applications.value?.filter((app) => {
    //   return searchQuery.value.category ?
    //   app.category.toString().toLowerCase() === searchQuery.value.category.toString().toLowerCase()
    //   : app;
    // })
    // applicationStore.$patch({
    //   filteredApplication: matchedApplications,
    // })
    if (!searchedAgainstAPI.value) {
      applicationStore.$patch({
        filteredApplication: matchedApplications,
        itemCount: matchedApplications.length,
        currentPage: 1
      })
    }
  } catch (error) {
    console.error(error.message)
  }
}

function sortByConsortium() {
  try {
    applicationStore.$patch({
      currentPage: 1,
    })
    const matchedApplications =
      filteredApplication.value?.length && searchQuery.value.consortium
        ? filteredApplication.value?.filter((app) => {
            return (
              app.approvedByConsortia.toString().toLowerCase() ===
              searchQuery.value.consortium.toString().toLowerCase()
            )
          })
        : applications.value?.filter((app) => {
            return searchQuery.value.consortium
              ? app.approvedByConsortia.toString().toLowerCase() ===
                  searchQuery.value.consortium.toString().toLowerCase()
              : app
          })
    applicationStore.$patch({
      filteredApplication: matchedApplications,
      itemCount: matchedApplications.length,
      currentPage: 1,
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