<template>
        <v-card-text>
            <v-form>
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-autocomplete
                            v-model="profileSections[activeProfileTabIndex].vmodel.title"
                            label="Title"
                            type="text"
                            variant="outlined"
                            :items="titles"
                            item-title="label"
                            item-value="code"
                            clearable
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.fullName"
                            label="Full Name"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.eMail"
                            label="Email"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.phone"
                            label="Phone number"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="profileSections[activeProfileTabIndex].vmodel.address"
                            label="Address"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
</template>

<script setup>
import { useProfile } from '@/stores';
import { storeToRefs } from 'pinia';

// STORE
const profileStore = useProfile();
const { profileSections, activeProfileTabIndex } = storeToRefs(profileStore)



const titles = [
    {
        code: "MR.",
        label: "Mr."
    },
    {
        code: "MS.",
        label: "Ms."
    },
    {
        code: "MRS.",
        label: "Mrs."
    },
    {
        code: "DR.",
        label: "Dr."
    },
    {
        code: "PROF.",
        label: "Prof."
    },
    {
        code: "REPS.",
        label: "Reps."
    },
    {
        code: "MISS.",
        label: "Miss."
    },
    {
        code: "SEN.",
        label: "Sen."
    },
    {
        code: "REV.",
        label: "Rev."
    },
    {
        code: "PR.",
        label: "Pr."
    },
    {
        code: "GEN.",
        label: "Gen."
    },
    {
        code: "ASSOC.",
        label: "Assoc."
    },
    {
        code: "DIR.",
        label: "Dir."
    },
    {
        code: "ENG.",
        label: "Eng."
    },
    {
        code: "PRIN.",
        label: "Prin."
    }
]
</script>

<style lang="scss" scoped>

</style>