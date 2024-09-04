<template>
        <v-card-text>
            <v-form>
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-autocomplete
                            v-model="contactPErson.title"
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
                            v-model="contactPErson.fullName"
                            label="Full Name"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="contactPErson.eMail"
                            label="Email"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="contactPErson.phone"
                            label="Phone number"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="contactPErson.address"
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
import { ref } from 'vue';

// VARIABLES
const contactPErson = ref(
    {
        title: "",
        eMail: "",
        fullName: "",
        phone: "",
        address: ""
    }
)
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