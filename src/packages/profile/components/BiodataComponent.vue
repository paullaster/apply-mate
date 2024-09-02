<template>
        <v-card-text>
            <v-form>
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="name"
                            label="Institution Name"
                            variant="outlined"
                            required
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="age"
                            label="Branch/Campus"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="age"
                            label="Branch/Campus"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="age"
                            label="Duration of each semester (in months)"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                </v-row>
                <v-row class="my-4">
                    <v-col >
                        <v-autocomplete
                            v-model="age"
                            label="Region"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col>
                        <v-autocomplete
                            v-model="age"
                            label="County"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col>
                        <v-autocomplete
                            v-model="age"
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

</script>

<style lang="scss" scoped>

</style>