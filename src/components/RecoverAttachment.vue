<template>
  <v-card width="800px" elevation="0">
    <v-card-tit>
      <h3>Attachments</h3>
      <p>Please upload your required documents</p>
    </v-card-tit>
    <v-card-text>
      <v-form ref="attachmentUpload">
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.coverLetter"
              accept=".docx,.doc"
              label="Cover letter"
              :rules="rules.coverLetter"
              @change="setCoverLetter"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.cv"
              accept=".docx,.doc"
              label="Curriculum Vitae"
              :rules="rules.cv"
              @change="setCV"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.certificate_testimonials"
              accept=".docx,.doc"
              label="Certificates & testimonials (You can uploads multiple)"
              :rules="rules.certificate_testimonials"
              @change="setCertificateTestimonials"
            ></v-file-input>
          </v-col>
          <v-col>
            <v-btn :color="ColorHelper.colorsHelper('primary')" @click="submitAttachment">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import ColorHelper from '@/util/ColorHelper'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useApplication } from '@/stores'

const route = useRoute()

const formData = ref({
  attachments: {
    coverLetter: null,
    cv: null,
    certificate_testimonials: null
  }
})

const attachmentUpload = ref (null)

const rules = computed(() => {
  return {
    coverLetter: [
      (v) => !!v || 'Cover letter is required',
      (v) => (v && Array.from(v)[0].name.endsWith('.docx')) || 'Only .docx files are allowed'
    ],
    cv: [
      (v) => !!v || 'CV is required',
      (v) => (v && Array.from(v)[0].name.endsWith('.docx')) || 'Only .docx files are allowed'
    ],
    certificate_testimonials: [
      (v) => !!v || 'Certificate and testimonials are required',
    ]
  }
})

async function submitAttachment() {
  try {
    const { valid } = await attachmentUpload.value.validate();
    if(!valid) {
      return useToast().warning('Invalid payload. Please provide the correct attachment types');
    }
    const newFormData = new FormData()
    newFormData.append('coverLetter', formData.value.attachments.coverLetter)
    newFormData.append('cv', formData.value.attachments.cv)
    newFormData.append(
      'certificate_testimonials',
      formData.value.attachments.certificate_testimonials
    )
    const user = atob(route.query._rdx)
    newFormData.append('user', user)
    console.log(newFormData)
    useApplication()
      .recoverAttachments(newFormData)
      .then(() => useToast().success('Uploaded'))
      .catch(() => useToast().error('An error occurred'))
  } catch (error) {
    console.log(error)
    useToast().error('An error occurred')
  }
}
</script>

<style lang="scss" scoped>
</style>