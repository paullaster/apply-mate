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
               label="Search by application number, applicant name, county name"
               v-model="searchQuery.searchText"
               ></v-text-field>
            </v-col>
            <v-col cols="12"> 
                <v-label>Age</v-label>
                <v-slider v-model="searchAge" min="18" max="65"></v-slider>
               <v-select label="Search by Status" :items="['New', 'Onboarded']" v-model="searchQuery.searchStatus"></v-select>
            </v-col>
            <v-col cols="12"> 
              <v-label>Gender</v-label>
              <v-select label="Search by gender" :items="['Male', 'Female', 'Other']" v-model="searchQuery.searchGender"></v-select>
            </v-col>
            <v-col cols="12"> 
              <v-label>County</v-label>
              <v-select label="Search by county" :items="countyList" v-model="searchQuery.searchCounty"></v-select>
            </v-col>
            <v-col cols="12"> 
              <v-label>Category</v-label>
              <v-select label="Search by application category" :items="Array.from(new Set(user?.categoriesFilter?.split('|')))" v-model="searchQuery.searchApplicationCategory"></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { useGlobalStore, useAuth, useSetupStore} from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';

// STORE
const globalStore = useGlobalStore()
const authStore = useAuth();
const setupStore = useSetupStore();
const { searchDialog, searchQuery } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore);
const { counties } = storeToRefs(setupStore);

defineProps({
   propertiesArray: Array,
});


const countyList = computed(() => counties.value.filter(c => {
   return Array.from(new Set(user?.countiesFilter?.split('|'))).filter(f => f === c?.countyNo)
}));

</script>

<style scoped>
.dialog-card {
  height: 100% !important;
  background-color: red !important;
}
</style>