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
       <v-form ref="forgot_password">
        <v-row>
            <v-col cols="12">
                <v-text-field
                type="email"
                label="email"
                variant="outlined"
                v-model="formData.email"
                :rules="rules.email"
                >

                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn  variant="flat" :color="ColorHelper.colorsHelper('primary')" @click="resetPassword">
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
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useAuth } from "@/stores";
import ColorHelper from "@/util/ColorHelper";


// VARS
const formData = ref({ email: '' });

// ROUTE
const router = useRouter();


// STORES
const authStore = useAuth();

const forgot_password = ref(null);

const rules = computed(() => {
    return {
        email: [
            v =>!!v || 'Email is required',
            v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
        ],
    }
})

// FUNCTION
async function resetPassword() {
    try {
        const { valid } = await forgot_password.value.validate();
        if (!valid) {
            useToast().error("Invalid  information");
            return;
        };
        await authStore.resetPassword(formData.value);
    } catch (error) {
        useToast().error(error.message);
    }finally {
        forgot_password.value.reset();
    }
}

</script>

<style scoped>

</style>