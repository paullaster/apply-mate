<template>
  <v-dialog v-model="component.status" max-width="500">
    <v-card style="padding: 1.6rem;">
      <v-card-title class="my-3">{{component.description}}</v-card-title>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              :items="component.controls.autocomplete.items"
              :label="component.controls.autocomplete.label"
              v-model="component.controls.vmodel.autocomplete"
              :item-title="component.controls.autocomplete.item_title"
              :item-value="component.controls.autocomplete.item_value"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              :label="component.controls.textField.label"
              v-model="component.controls.vmodel.textField"
              :type="component.controls.vmodel.textField.type"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-btn 
            :color="component.controls.actions.color"
            :loading="component.controls.actions.loading"
            @click.stop="component.status = false"
            @click.prevent="component.controls.actions.fn(component.controls.vmodel)"
            
            >
            <template v-if="component.controls.actions.loading">
              <v-icon>loading</v-icon>
            </template>
            <template v-else>
              <v-icon :color="component.controls.actions.iconColor" class="mr-2">{{ component.controls.actions.icon }}</v-icon>
              <span>
                {{ component.controls.actions.caption }}
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

// STORE
const profileStore = useProfile()
const { component } = storeToRefs(profileStore)
</script>