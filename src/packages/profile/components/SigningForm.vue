<template>
    <v-container class="my-5">
      <h2 class="text-center">Signing Form</h2>
  
      <v-form ref="form" @submit="submitForm">
        <v-card class="mt-4">
          <v-card-title>Download the application form below to complete this section and then re-upload a duly completed signed application form</v-card-title>
          <v-card-text>
            <v-select
            :items="userActions"
            item-title="label"
            item-value="value"
            v-model="selectedAction"
            label="Select action here e.g Download or Upload the application form"
            clearable
            >

            </v-select>
  
            <v-file-input label="Upload completed and signed application form" accept=".jpg,.jpeg,.png" v-model="signatureFile" v-if="selectedAction === 'Uploadtheapplicationform'"/>
           
          </v-card-text>
          <v-card-actions>
            <v-btn
            v-if="selectedAction === 'Downloadapplicationform'"
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"
            >
              <v-icon size="40" class="mr-2">mdi-cloud-download-outline</v-icon>
              <span>Download Application Form</span>
            </v-btn>
            <v-btn 
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"
            v-if="selectedAction === 'Uploadtheapplicationform'" >Submit Signed Application Form</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import ColorHelper from '@/util/ColorHelper';
  
  const selectedAction = ref('');
  
  const downloadedApplicationForm = ref(false);
  const form = ref(null);
  const userActions = [
    {
      label: 'Download application form',
      // action: () => {
      //   // Download application form and update downloadedApplicationForm flag
      //   downloadedApplicationForm.value = true;
      // },
      disabled:!downloadedApplicationForm.value,
      value: 'Downloadapplicationform',

    },
    {
      label: 'Upload the application form',
      // action: () => {
      //   // Upload application form and update downloadedApplicationForm flag
      //   downloadedApplicationForm.value = true;
      // },
      disabled: downloadedApplicationForm.value,
      value: 'Uploadtheapplicationform',
    }
  ];

  </script>