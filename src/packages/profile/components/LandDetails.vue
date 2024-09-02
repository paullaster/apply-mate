<template>
    <v-card-text>
      <v-form class="my-4">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="landRefrenceNumber"
              id="name"
              label="Land Reference Number"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="landOccupied"
              type="number"
              label="Aread under occupation (Acres)"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="landAvailableForProposedAccommodation"
              type="number"
              label="Size of land available for proposed accommodation (Acres)"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="isdisabled_container">
              <div><span>Have a master plan?</span></div>
              <div class="check-box">
                <input
                  type="checkbox"
                  v-model="haveMasterPlan"
                  :checked="haveMasterPlan"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-file-input
              label="Upload master plan"
              variant="outlined"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="landPin"
              type="text"
              label="Pin location of land for student accommodation"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>