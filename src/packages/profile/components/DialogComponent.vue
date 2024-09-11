<template>
  <v-dialog v-model="customComponent.status" max-width="500">
    <v-card style="padding: 1.6rem;">
      <v-card-title class="my-3">{{customComponent.description}}</v-card-title>
      <v-form>
        <v-row>
          <template v-for=" (control) in customComponent.controls" :key="control.prop">
            <v-col :cols="control.cols">
              <component
              :is="getCustomComponent(control.component)" 
              :key="control.prop"
              v-model="control.model"
              v-bind="control.options"
              />
            </v-col>
          </template>
          <v-col cols="12">
            <v-btn 
            :color="customComponent.actions.cancel.color"
            :loading="profileRecordsLoadingStatus"
            @click.prevent="customComponent.actions.cancel.fn()"
            class="mr-3"
            
            >
            <template v-if="profileRecordsLoadingStatus">
              <v-icon>loading</v-icon>
            </template>
            <template v-else>
              <v-icon :color="customComponent.actions.cancel.iconColor" class="mr-2">{{ customComponent.actions.cancel.icon }}</v-icon>
              <span>
                {{ customComponent.actions.cancel.caption }}
              </span>
            </template>
              
            </v-btn>
            <v-btn 
            :color="customComponent.actions.submit.color"
            :loading="profileRecordsLoadingStatus"
            @click.prevent="customComponent.actions.submit.fn(customComponent.controls.vmodel)"
            
            >
            <template v-if="profileRecordsLoadingStatus">
              <v-icon>loading</v-icon>
            </template>
            <template v-else>
              <v-icon :color="customComponent.actions.submit.iconColor" class="mr-2">{{ customComponent.actions.submit.icon }}</v-icon>
              <span>
                {{ customComponent.actions.submit.caption }}
              </span>
            </template>
              
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useProfile } from '@/stores'
import { storeToRefs } from 'pinia'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'
import { VTextField } from 'vuetify/components/VTextField'

// STORE
const profileStore = useProfile()
const { customComponent, profileRecordsLoadingStatus } = storeToRefs(profileStore)

// METHODS
function getCustomComponent(component) {
  switch (component) {
    case 'v-autocomplete':
      return VAutocomplete
    case 'v-text-field':
      return VTextField
    default:
      return null
  }
}

</script>