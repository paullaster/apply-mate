<template>
  <v-row>
    <v-col cols="3">
      <v-card height="200" >
        <v-card-title>
          <h1
            :style="`font-size: 1.2rem;
            font-weight: bolder;
            color: ${ColorHelper.colorsHelper('primary')};
            display:flex;
            flex-direction: column;
            
            `"
          >
            <span> 800(15%) </span>
            <span> Female </span>
          </h1>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card height="200">
        <v-card-title>
          <h1
            :style="`font-size: 1.2rem;
            font-weight: bolder;
            color: ${ColorHelper.colorsHelper('primary')};
            display:flex;
            flex-direction: column;
            
            `"
          >
            <span> 800(15%) </span>
            <span> Male </span>
          </h1>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card height="200" >
        <v-card-title>
          <h1
            :style="`font-size: 1.2rem;
            font-weight: bolder;
            color: ${ColorHelper.colorsHelper('primary')};
            display:flex;
            flex-direction: column;
            
            `"
          >
            <span> 800(15%) </span>
            <span> Under 30 </span>
          </h1>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card height="200">
        <v-card-title>
          <h1
            :style="`font-size: 1.2rem;
            font-weight: bolder;
            color: ${ColorHelper.colorsHelper('primary')};
            display:flex;
            flex-direction: column;
            
            `"
          >
            <span> 800(15%) </span>
            <span> Disabled </span>
          </h1>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  <script setup>
import { useApplication } from '@/stores'
import ColorHelper from '@/util/ColorHelper'

import { ref } from 'vue'

const applicationStore = useApplication()
</script>
  