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
                @input="search"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="searchQuery.county"
                :items="countyList"
                label="Filter by county"
                placeholder="Select county"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useGlobalStore, useAuth, useSetupStore, useApplication } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'


// STORE
const globalStore = useGlobalStore()
const authStore = useAuth()
const setupStore = useSetupStore()
const applicationStore = useApplication()
const { searchDialog, searchQuery } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore)
const { counties, categories } = storeToRefs(setupStore)
const { applications, filteredApplication } = storeToRefs(applicationStore);

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
});
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
    const filteredApplication = applications.value?.filter((app) => {
      return (
        app.no.toString().includes(searchQuery.value.searchText) ||
        app.fullName.toString().toLowerCase().includes(searchQuery.value.searchText.toLowerCase())
      );
    })
    applicationStore.$patch({
      filteredApplication: filteredApplication,
    })
  } catch (error) {
    console.error(error.message);
  }
}
</script>

<style scoped>
.dialog-card {
  height: 100% !important;
  background-color: red !important;
}
</style>