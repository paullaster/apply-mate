<template>
    <v-dialog v-model="component.status" max-width="500">
      <v-card style="padding-inline:0.8rem;">
        <v-card-title>Add Component</v-card-title>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                :items="component.componentTypes.items"
                :label="component.componentTypes.label"
                v-model="studentData.yearOfStudy"
                :item-title="component.componentTypes.item_title"
                :item-value="component.componentTypes.item_value"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Component Name" v-model="studentData.totalNo" />
            </v-col>
            <v-col cols="12">
              <v-btn @click="addNewComponent">Add</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { useProfile } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


// STORE
const profileStore = useProfile();
const { component } = storeToRefs(profileStore);
const studentData = ref(
    {
        yearOfStudy: null,
        totalNo: null,
    }
)
</script>