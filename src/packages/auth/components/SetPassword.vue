<template>
    <v-card-title> Set your password </v-card-title>
  <v-card-text>
    <v-form ref="newPasswordForm">
      <v-row>
        <v-col cols="12">
          <v-text-field 
          label="password" 
          type="password" 
          variant="outlined"
          v-model="formData.password"
          :rules="rules.password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field 
          label="confirm password" 
          type="password" 
          variant="outlined"
          v-model="formData.confirmPassword"
          :rules="rules.confirmPassword"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn flat @click="setPassword" :color="ColorHelper.colorsHelper('primary')">
            <v-icon class="mr-3">mdi-onepassword</v-icon>
            <span>set password</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuth } from '@/stores';
import { useRoute } from 'vue-router';
import ColorHelper from '@/util/ColorHelper';

// ROUTES
const route = useRoute();

// STORE INSTANCE
const authStore = useAuth();

const newPasswordForm = ref(null);
const formData = ref({
  token: route.params.token,
  password: '',
  confirmPassword: '',
});

const rules = computed(() => {
    return {
        password: [
            v =>!!v || 'Password is required',
            v => v.length >= 8 || 'Password must be at least 8 characters long'
        ],
        confirmPassword: [
            v =>!!v || 'Password is required',
            v => v === formData.value.password || 'Confirm Password and Password must be the same!'
        ]
    }
})

// COMPONENT METHODS
async function setPassword() {
    try {
        const { valid } = await newPasswordForm.value.validate();
        if (!valid) {
            useToast().error("Invalid password");
            return;
        };
        await authStore.setPassword({token:formData.value.token, password: formData.value.password});
    } catch (error) {
        useToast().error(error.message);
    }finally {
        newPasswordForm.value.reset();
    }
}

</script>

<style lang="scss" scoped>

</style>