<template>
    <v-container class="my-5">
      <h2 class="text-center">Declaration Form for Accommodation</h2>
  
      <v-form ref="form" @submit="submitForm">
        <v-card class="mt-4">
          <v-card-title>Declaration by Institution Authority</v-card-title>
          <v-card-text>
            <v-checkbox v-model="agreeToLandAvailability" label="Institution authority will avail land for student accommodation with no encumbrance" required />
            <v-checkbox v-model="agreeToLandSeparation" label="Institution Authority will separate and facilitate access to land for student accommodation" required />
            <v-checkbox v-model="agreeToHousingFundManagement" label="The units developed will be managed and operated by the Housing Fund and State Department for Housing and Urban Development until the cost of construction is recovered before handing over to the institution authority" required />
            <v-checkbox v-model="agreeToPaymentTransfer" label="The institution will transfer the payment of student accommodation to an agent appointed by the two bodies until the full construction cost is recovered" required />
            <v-checkbox v-model="agreeToBoardResolution" label="The Institution’s board will pass a resolution and sign a Memorandum of Understanding with SDHUD" required />
          </v-card-text>
          <v-card-actions>
            <v-btn 
            width="150px"
            variant="flat"
            :color="ColorHelper.colorsHelper('primary')"  >Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import ColorHelper from '@/util/ColorHelper';
import { ref } from 'vue';
  
  const agreeToLandAvailability = ref(false);
  const agreeToLandSeparation = ref(false);
  const agreeToHousingFundManagement = ref(false);
  const agreeToPaymentTransfer = ref(false);
  const agreeToBoardResolution = ref(false);
  
  const form = ref(null);
  
  const submitForm = () => {
    // Handle form submission here, e.g., send data to a server
    console.log('Form submitted:', {
      agreeToLandAvailability: agreeToLandAvailability.value,
      agreeToLandSeparation: agreeToLandSeparation.value,
      agreeToHousingFundManagement: agreeToHousingFundManagement.value,
      agreeToPaymentTransfer: agreeToPaymentTransfer.value,
      agreeToBoardResolution: agreeToBoardResolution.value,
    });
  };
  </script>

