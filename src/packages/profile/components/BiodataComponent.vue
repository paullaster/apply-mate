<template>
        <v-card-text>
            <v-form>
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="biodata.institutionName"
                            label="Institution Name"
                            variant="outlined"
                            required
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="branch"
                            label="Branch/Campus"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="biodata.durationEachSemester"
                            label="Duration of each semester (in months)"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-autocomplete
                            v-model="biodata.region"
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
                            v-model="county"
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
                            v-model="biodata.town"
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
import { useSetupStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// STORE
const setupStore = useSetupStore();
const { counties } = storeToRefs(setupStore);


// VARIABLES
const biodata = ref(
    {
        institutionName: '',
        branch: '',
        durationEachSemester: '',
        region: '',
        county: '',
        town: ''
    }
)
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