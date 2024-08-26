<template>
    <v-container class="my-5">
      <h2 class="text-center">Signing Form</h2>
  
      <v-form ref="form" @submit="submitForm">
        <v-card class="mt-4">
          <v-card-title>Institution Authority Information</v-card-title>
          <v-card-text>
            <v-text-field label="Name" v-model="name" required />
            <v-text-field label="Designation" v-model="designation" required />
            <v-text-field label="ID Number" v-model="idNumber" required />
            <v-text-field label="Telephone" v-model="telephone" required />
            <v-text-field label="Email" v-model="email" required />
  
            <v-otp-input v-model="otp" :length="6" />
  
            <v-file-input label="Upload Signature" accept=".jpg,.jpeg,.png" v-model="signatureFile" />
            <SignatureComponent />
           
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" type="submit" >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SignatureComponent from './SignatureComponent.vue';
  
  const name = ref('');
  const designation = ref('');
  const idNumber = ref('');
  const telephone = ref('');
  const email = ref('');
  const otp = ref('');
  const signatureFile = ref(null);
  const scribbleSignature = ref('');
  
  const form = ref(null);
  
  const submitForm = () => {
    // Validate OTP and other fields
    // Send OTP verification request
    // ...
  
    // If OTP is valid, proceed with submission
    // Handle form submission here, e.g., send data to a server
    console.log('Form submitted:', {
      name: name.value,
      designation: designation.value,
      idNumber: idNumber.value,
      telephone: telephone.value,
      email: email.value,
      otp: otp.value,
      signatureFile: signatureFile.value,
      scribbleSignature: scribbleSignature.value,
    });
  };
  </script>