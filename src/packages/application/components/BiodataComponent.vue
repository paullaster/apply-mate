
<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component -->
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="4" md="12" sm="12">
              <v-card-title>Personal Information</v-card-title>
              <v-list two-line>
                <v-list-item>
                    <v-list-item-title>{{ item?.firstName }} {{ item?.lastName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.idNumber }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Date of Birth</v-list-item-title>
                    <v-list-item-subtitle>{{ DateUtil.toDate(item?.dob)}}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>County of origin</v-list-item-title>
                    <v-list-item-subtitle>{{ counties.find(c => c.CountyNo === item?.countyOfOrigin)?.countyName}}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Gender</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.gender}}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Disabled</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.disabled}}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>KRA PIN</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.pinNumber}}</v-list-item-subtitle>
                </v-list-item>
                </v-list>
            </v-col>
            
            <v-col cols="12" lg="4" md="12" sm="12">
              <v-card-title>Professional Information</v-card-title>
              <v-list two-line>
                <v-list-item>
                    <v-list-item-title>Profession</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.profession }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Registered Professional</v-list-item-title>
                    <v-list-item-subtitle v-text="item?.registeredProfessional ? 'Yes' : 'No'"></v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-if="item?.registeredProfessional">
                    <v-list-item-title>Registration Body</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.registeredProfessionalBody }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-if="item?.registeredProfessional">
                    <v-list-item-title>Registration Number</v-list-item-title>
                    <v-list-item-subtitle>{{ item?.registeredProfessionalRegistrationNumber }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Willing to Work Anywhere</v-list-item-title>
                    <v-list-item-subtitle v-text="item?.willingToWorkAnyWhere ? 'Yes' : 'No'"></v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { useSetupStore } from "@/stores";
import DateUtil from "@/util/DateUtil";
  import { storeToRefs } from "pinia";
  defineProps({
    item: Object,
  });

// STORE
  const setupStore = useSetupStore();
  const { counties } = storeToRefs(setupStore);
</script>

<style scoped>
.v-card-text {
  padding: 20px; /* Add some padding for better readability */
}

.v-list-item-title {
  font-weight: bold; /* Make titles bolder */
}
</style>