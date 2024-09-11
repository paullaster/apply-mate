<template>
        <v-card-text>
            <v-form :ref="profileSections[activeProfileTabIndex].formRef">
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.institutionName"
                            label="Institution Name"
                            variant="outlined"
                            required
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.campus"
                            label="Branch/Campus"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.durationEachSemester"
                            label="Duration of each semester (in months)"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-autocomplete
                            v-model="profileSections[activeProfileTabIndex].vmodel.region"
                            label="Region"
                            type="text"
                            variant="outlined"
                            :items="regions"
                            item-title="description"
                            item-value="code"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-autocomplete
                            v-model="profileSections[activeProfileTabIndex].vmodel.county"
                            label="County"
                            type="text"
                            variant="outlined"
                            :items="counties"
                            item-title="countyName"
                            item-value="CountyNo"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.town"
                            label="Town/City"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
</template>

<script setup>
import { useProfile, useSetupStore } from '@/stores';
import { storeToRefs } from 'pinia';

// STORE
const setupStore = useSetupStore();
const profileStore = useProfile();
const { counties } = storeToRefs(setupStore);
const { profileSections, activeProfileTabIndex } = storeToRefs(profileStore)


const regions = [
    {
        code: "NYANZA",
        description: "NYANZA",
    },
    {
        code: "WESTERN KENYA",
        description: "WESTERN KENYA",
    },
    {
        code: "RIFT VALLEY",
        description: "RIFT VALLEY",
    },
    {
        code: "NAIROBI",
        description: "NAIROBI",
    },
    {
        code: "NORTH EASTERN",
        description: "NORTH EASTERN",
    },
    {
        code: "EASTERN KENYA",
        description: "EASTERN KENYA",
    },
    {
        code: "CENTRAL KENYA",
        description: "CENTRAL KENYA",
    },
    {
        code: "COAST",
        description: "COASTAL KENYA",
    }
]
</script>