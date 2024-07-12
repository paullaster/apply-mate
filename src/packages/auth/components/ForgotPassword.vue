<template>
    <v-row>
        <v-col cols="12">
            <v-btn @click="router.back()" flat text >
                <v-icon class="mr-3">mdi-keyboard-backspace</v-icon>
                <span>Back</span>
            </v-btn>
        </v-col>
    </v-row>
    <v-card-title>
        Forgot your password?
    </v-card-title>
    <v-card-text>
       <v-form>
        <v-row>
            <v-col cols="12">
                <v-text-field
                type="email"
                label="email"
                v-model="formData.email"
                >

                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn text flat >
                    <span>request reset link</span>
                    <v-icon class="ml-3">mdi-arrow-right-thin</v-icon>
                </v-btn>
            </v-col>
        </v-row>
       </v-form>
    </v-card-text>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

// VARS
const formData = ref({ email: '' });

// ROUTE
const router = useRouter();

</script>

<style lang="scss" scoped>

</style>