<template>
    <v-row>
                <v-col cols="12">
                    <v-btn text flat @click="()=>router.back()">
                        <v-icon class="mr-3" >mdi-keyboard-backspace</v-icon>
                        <span>back</span>
                    </v-btn>
                </v-col>
            </v-row>
        <v-card-title>
            Activate your account
        </v-card-title>
        <v-card-tex>
            <v-form>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                        label="email"
                        type="email"
                        v-model="formData.email"
                        >

                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn text flat>
                            activate now
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-tex>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";


// ROUTES
const router = useRouter();

const formData = ref({
    email: '',
})

</script>

<style lang="scss" scoped>

</style>