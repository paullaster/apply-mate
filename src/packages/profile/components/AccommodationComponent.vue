<template>
  <v-card-text>
    <v-expansion-panels class="my-4" variant="inset">
      <v-expansion-panel>
        <v-expansion-panel-title> Student Data </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-toolbar>
            <v-toolbar-title> Current number of students and their years of study </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              :color="ColorHelper.colorsHelper('primary')"
              @click="() => profileStore.setDialogComponent('student')"
              :loading="profileRecordsLoadingStatus"
            >
              <v-icon class="mr-2">mdi-account-plus</v-icon>
              <span>Add students</span>
            </v-btn>
          </v-toolbar>
          <v-data-table :headers="headers"> </v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="my-4" variant="inset">
      <v-expansion-panel>
        <v-expansion-panel-title> Bed Capacity </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="bedCapacity"
                  id="bedCapacity"
                  type="number"
                  min="1"
                  label="Total bed Capacity"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-toolbar>
                  <v-toolbar-title> Proposed Accommodation when full capacity </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="flat"
                    :color="ColorHelper.colorsHelper('primary')"
                    @click="() => profileStore.setDialogComponent('accommodationUnits')"
                    :loading="profileRecordsLoadingStatus"
                  >
                  <v-icon class="mr-2">mdi-bunk-bed</v-icon>
                   <span>Add Accommodation</span>
                  </v-btn>
                </v-toolbar>
                <v-data-table :headers="bedsDataHeader"> </v-data-table>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="my-4" variant="inset">
      <v-expansion-panel>
        <v-expansion-panel-title>
          Staff Data
          <!-- <template v-slot:actions="{ expanded }">
              <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
            </template> -->
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="accommodationRates"
                  id="accommodationRates"
                  type="number"
                  min="1"
                  label="Number of Staff in the Institution"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12">
              <v-toolbar>
                <v-toolbar-title> Current staff accommodation to be designed </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn variant="flat" :color="ColorHelper.colorsHelper('primary')">
                  Add Accommodation
                </v-btn>
              </v-toolbar>
              <v-data-table :headers="staffAccommodationHeader"> </v-data-table>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="my-4" variant="inset">
      <v-expansion-panel>
        <v-expansion-panel-title> Students Accommodation Rates </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="fees"
                  id="fees"
                  type="number"
                  min="1"
                  label="Accommodation fees per student per semester"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12">
              <v-toolbar>
                <v-toolbar-title>
                  Current accommodation rates for students per semester
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn variant="flat" :color="ColorHelper.colorsHelper('primary')">
                  Add charge rates
                </v-btn>
              </v-toolbar>
              <v-data-table :headers="studentAccommodationChargeSheetHeader"> </v-data-table>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card-text>
</template>

<script setup>
import { useProfile } from '@/stores'
import ColorHelper from '@/util/ColorHelper'
import { storeToRefs } from 'pinia'

// STORE
const profileStore = useProfile()
const { profileRecordsLoadingStatus } = storeToRefs(profileStore)

// VARIABLES
const headers = [
  { title: 'Year of Study', value: 'yearOfStudy' },
  { title: 'Number of Student', value: 'count' },
  { title: 'Actions', value: 'action' }
]

const bedsDataHeader = [
  { title: 'Type', value: 'type' },
  { title: 'Units', value: 'units' },
  { title: 'Actions', value: 'action' }
]
const staffAccommodationHeader = [
  { title: 'Size', value: 'size' },
  { title: 'Counts', value: 'count' },
  { title: 'Actions', value: 'action' }
]
const studentAccommodationChargeSheetHeader = [
  { title: 'Type (Size)', value: 'type' },
  { title: 'Cost Per student', value: 'charge' },
  { title: 'Actions', value: 'action' }
]
</script>
