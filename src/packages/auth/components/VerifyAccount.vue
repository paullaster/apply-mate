<template>
    <v-card-title>Verify your {{}} account </v-card-title>
    <v-card-text>
    <div class="text-body-2">
      We sent a verification code to john..@gmail.com <br />

      Please check your email and paste the code below.
    </div>

    <v-sheet color="surface">
        <v-otp-input v-model="otp" type="text" variant="solo" ></v-otp-input>
    </v-sheet>

    <v-btn class="my-4" :color="ColorHelper.colorsHelper('primary')" height="40" text="Verify" variant="flat" width="100%"></v-btn>

    <div class="text-caption">
      Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
    </div>
  </v-card-text>
</template>

<script setup>
import ColorHelper from '@/util/ColorHelper';
import { inject, ref } from 'vue';


// INJECTS
inject('account');
// VARIS
const otp = ref('');







</script>

<style lang="scss" scoped>
</style>