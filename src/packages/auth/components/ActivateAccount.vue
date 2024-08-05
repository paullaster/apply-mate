<template>
  <v-row>
    <v-col cols="12">
      <v-btn text flat @click="() => router.back()">
        <v-icon class="mr-3">mdi-keyboard-backspace</v-icon>
        <span>back</span>
      </v-btn>
    </v-col>
  </v-row>
  <v-card-title> Activate your account </v-card-title>
  <v-card-text>
    <v-form ref="activate_account_form">
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="email"
            type="email"
            variant="outlined"
            v-model="formData.email"
            :rules="rules.email"
            hint="Enter consortium email address"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn variant="flat" :color="ColorHelper.colorsHelper('primary')" @click="activate">
            <v-icon class="mr-3">mdi-lock-open-outline</v-icon>
            <span>activate now</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script setup>
import { useAuth } from '@/stores'
import ColorHelper from '@/util/ColorHelper'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// ROUTES
const router = useRouter()

// STORE
const authStore = useAuth()

const activate_account_form = ref(null)

const formData = ref({
  email: ''
})
const rules = computed(() => {
  return {
    email: [
      (v) => !!v || 'Email is required',
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
    ]
  }
})

// FUNCTION
async function activate() {
  try {
    const { valid } = await activate_account_form.value.validate()
    if (!valid) {
      useToast().error('Invalid  information')
      return
    }
    await authStore.activateConsoltium(formData.value)
  } catch (error) {
    useToast().error(error.message)
  } finally {
    activate_account_form.value.reset()
  }
}
</script>

<style lang="scss" scoped>
</style>