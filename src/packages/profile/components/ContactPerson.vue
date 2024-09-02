<template>
        <v-card-text>
            <v-form>
                <v-row class="my-4">
                    <v-col cols="12" lg="6">
                        <v-select
                            v-model="age"
                            label="Title"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="email"
                            label="Email"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="age"
                            label="Name"
                            type="text"
                            variant="outlined"
                        />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="age"
                            label="Phone number"
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