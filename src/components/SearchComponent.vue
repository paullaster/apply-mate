<template>
  <v-row flex>
    <v-dialog v-model="searchDialog" max-width="800px" min-height="500">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12"> <span> Search for a applicant(s)</span></v-col>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="Search by application number, applicant name"
                v-model="searchQuery.searchText"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label>Age</v-label>
              <v-slider v-model="searchQuery.age" min="28" max="65"></v-slider>
              <v-select
                label="Search by Status"
                :items="['New', 'Onboarded']"
                v-model="searchQuery.status"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-label>Gender</v-label>
              <v-select
                label="Search by gender"
                :items="['Male', 'Female', 'Other']"
                v-model="searchQuery.gender"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-label>County</v-label>
              <v-select
                label="Search by county"
                :items="countyList"
                v-model="searchQuery.category"
                item-value="CountyNo"
                item-title="countyName"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-label>Category</v-label>
              <v-select
                label="Search by application category"
                :items="categoryList"
                item-value="code"
                item-title="description"
                v-model="searchQuery.countyOfOrigin"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn class="my-4 mx-2">
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useGlobalStore, useAuth, useSetupStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

// STORE
const globalStore = useGlobalStore()
const authStore = useAuth()
const setupStore = useSetupStore()
const { searchDialog, searchQuery } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore)
const { counties, categories } = storeToRefs(setupStore)

defineProps({
  propertiesArray: Array
})

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
</script>

<style scoped>
.dialog-card {
  height: 100% !important;
  background-color: red !important;
}
</style>