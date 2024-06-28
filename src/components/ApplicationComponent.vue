<script setup>
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { BASEAPIURL } from '@/environment'

const formData = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  dob: '',
  idNumber: '',
  pinNumber: '',
  countyOfOrigin: '',
  gender: '',
  disabled: false,
  contact: {
    phoneNumber: '',
    email: ''
  },
  physicalAddress: {
    countyOfResidence: '',
    constituency: '',
    street: '',
    city: '',
    estate: '',
    village: ''
  },
  profession: '',
  education: [],
  registeredProfessional: false,
  registeredProfessionalBody: '',
  registeredProfessionalRegistrationNumber: '',
  professionalBodys: [],
  currentlyEmployed: false,
  workExperience: {
    companyName: '',
    jobTitle: '',
    jobDescription: ''
  },
  attachments: {
    coverLetter: '',
    cv: '',
    certificate_testimonials: ''
  },
  declaration: false,
  willingToWorkAnyWhere: false,
})
const educationObject = ref({
  educationLevel: '',
  institution: '',
  degree: '',
  yearOfStart: '',
  yearOfGraduation: ''
});
const professionalBodys = ref({
  bodyName: '',
  membershipNumber: '',
  membershipType: ''
});

const gender = ['Male', 'Female']
const prefession = [
  'Select Profession',
  'Architecture',
  'Quantity Surveying',
  'Construction Management',
  'Civil/Structural Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Landscape Architecture',
  'Interior Design',
  'Sociology',
  'Environmental Scientists',
  'Health and Safety',
  'Real Estate',
  'Land Surveyors',
  'Communication and Branding',
  'ICT',
  'Others'
]
const educationLevel = [
  {
    description: 'Select Education Level',
    code: 'NONE'
  },
  {
    description: 'PHD',
    code: 'PHD'
  },
  {
    description: 'Masters',
    code: 'MASTERS'
  },
  {
    description: 'Bachelors',
    code: 'BACHELORS'
  },
  {
    description: 'Diploma',
    code: 'DIPLOMA'
  },
  {
    description: 'Certificate',
    code: 'CERTIFICATE'
  }
]
const headers = [
  {
    title: 'Education Level',
    value: 'educationLevel'
  },
  {
    title: 'University/College',
    value: 'institution'
  },
  {
    title: 'Course',
    value: 'degree'
  },
  {
    title: 'Year of Start',
    value: 'yearOfStart'
  },
  {
    title: 'Year of Graduation',
    value: 'yearOfGraduation'
  }
]

const headersProfessionalBody = [
  {
    title: 'Body Name',
    value: 'bodyName'
  },
  {
    title: 'Membership Number',
    value: 'membershipNumber'
  },
  {
    title: 'Membership Type',
    value: 'membershipType'
  }
]

const membershipTypes = ['Select Membership Type', 'Corporate', 'Graduate', 'Licentiate', 'Other']
const professionBody = ['Select Professional Body', 'Institue of Engineers Kenya', 'Other']
const coverLetterBase64 = ref('')
const cvBase64 = ref('')
const certificateTestimonialsBase64 = ref('')
const showEducationForm = ref(true);
const showProfessionalAssociationForm = ref(true);

// COMPUTED
const setAddEducation = computed({
  get: () => showEducationForm.value,
  set: (value) => (showEducationForm.value = value)
});

const setAddProfessionalAssociation = computed({
  get: () => showProfessionalAssociationForm.value,
  set: (value) => (showProfessionalAssociationForm.value = value)
});

const educationTableLength = computed(() => formData.value.education.length);
const professionalBodysTableLength = computed(() => formData.value.professionalBodys.length);
// WATCH
watch(educationTableLength, (value) => {
  if (value && value > 0) {
    setAddEducation.value = false
  }
});
watch(professionalBodysTableLength, (value) => {
  if (value && value > 0) {
    setAddProfessionalAssociation.value = false
  }
});

// METHODS
async function setCoverLetter() {
  try {
    const reader = new FileReader()
    reader.onloadend = () => {
      coverLetterBase64.value = reader.result
    }
    reader.readAsDataURL(formData.value.attachments.coverLetter)
  } catch (error) {
    useToast().error(error.message)
  }
}

async function setCV() {
  try {
    const reader = new FileReader()
    reader.onloadend = () => {
      cvBase64.value = reader.result
    }
    reader.readAsDataURL(formData.value.attachments.cv)
  } catch (error) {
    useToast().error(error.message)
  }
}

async function setCertificateTestimonials() {
  try {
    const reader = new FileReader()
    reader.onloadend = () => {
      certificateTestimonialsBase64.value = reader.result
    }
    reader.readAsDataURL(formData.value.attachments.certificate_testimonials)
  } catch (error) {
    useToast().error(error.message)
  }
}
async function submitApplication() {
  try {
    const response = await axios.request({
      method: 'post',
      url: '/application',
      baseURL: BASEAPIURL,
      data: {
        ...formData.value,
        attachments: {
          certificate_testimonials: certificateTestimonialsBase64.value.split(',')[1],
          cv: cvBase64.value.split(',')[1],
          coverLetter: coverLetterBase64.value.split(',')[1]
        },
        education: {
          ...formData.value.education,
          yearOfStart: Number(formData.value.education.yearOfStart),
          yearOfGraduation: Number(formData.value.education.yearOfGraduation)
        },
        dob: new Date(formData.value.dob).toISOString()
      }
    })
    useToast().success(response?.data?.message)
  } catch (error) {
    useToast().error('Failed to submit application. Please try again.')
  }
}
function addEducation() {
  try {
    console.log(educationObject.value)
    for (let prop in educationObject.value) {
      if (educationObject.value[prop] === '') {
        useToast().error(
          `Please fill out all fields for Education ${educationObject.value.educationLevel} ${educationObject.value.degree}`
        )
        return
      }
    }
    if (
      Number(educationObject.value.yearOfStart) > Number(educationObject.value.yearOfGraduation)
    ) {
      useToast().error('Year of Start cannot be later than Year of Graduation')
      return
    }
    formData.value.education.push(educationObject.value);
    educationObject.value = {};
  } catch (error) {
    useToast().error(error.message)
  }
}

function addProfessionalBody(){
  try {
    for (let prop in professionalBodys.value) {
      if (professionalBodys.value[prop] === '') {
        useToast().error(
          `Please fill out all fields.`
        );
        return
      }
    }
    formData.value.professionalBodys.push(professionalBodys.value);
    professionalBodys.value = {};
  } catch (error) {
    useToast().error(error.message)
  }
}

</script>
<template>
  <header style="margin-top: 2rem">
    <h4>Please provide the following information to complete your application</h4>
    <p>All the fields marked with (*) must be provided!</p>
  </header>
  <main>
    <section>
      <v-form>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Personal Details</h2>
            <p>Please provide your personal details.</p>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.firstName" label="First Name*" required></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.middleName" label="Other Name*" required></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.lastName" label="Last Name*" required></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.dob" label="Date of Birth*" type="date" required> </v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.idNumber" label="ID Number*" required> </v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.pinNumber" label="KRA PIN Number*" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field v-model="formData.countyOfOrigin" label="County of Origin*" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-radio-group v-model="formData.gender">
              <template v-slot:label>
                <p>Gender</p>
              </template>
              <template v-for="(item, index) in gender" :key="index">
                <v-radio :value="item" :label="item"></v-radio>
              </template>
            </v-radio-group>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <div class="isdisabled_container">
              <div><span>Physically Challenged?</span></div>
              <div class="check-box">
                <input type="checkbox" v-model="formData.disabled" :checked="formData.disabled" />
              </div>
            </div>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Contact Details</h2>
            <p>Please provide your contact details.</p>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <v-text-field
              v-model="formData.contact.email"
              label="Email Address*"
              type="email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <v-text-field
              v-model="formData.contact.phoneNumber"
              label="Phone Number*"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Physical Address</h2>
            <p>Please provide your physical address.</p>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.countyOfResidence"
              label="County of Residence*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.constituency"
              label="Constituency*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.street"
              label="Street*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.city"
              label="City/Town*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.estate"
              label="Estate*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <v-text-field
              v-model="formData.physicalAddress.village"
              label="Flat or Apartment or Village*"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Profession</h2>
            <p>Please provide your professional and Education informaton.</p>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              v-model="formData.profession"
              :items="prefession"
              label="Profession*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="isdisabled_container">
              <div><span>Registered Professional?</span></div>
              <div class="check-box">
                <input
                  type="checkbox"
                  v-model="formData.registeredProfessional"
                  :checked="formData.registeredProfessional"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" v-if="formData.registeredProfessional">
            <v-text-field
              v-model="formData.registeredProfessionalBody"
              label="Which professional body"
              placeholder=""
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-if="formData.registeredProfessional">
            <v-text-field
              v-model="formData.registeredProfessionalRegistrationNumber"
              label="Registration Number"
              placeholder=""
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Education</h2>
            <p>Please add your education background (You must add Your Bachelors degree*).</p>
          </v-card-text>
        </v-card>
        <v-row v-if="formData.education.length">
          <v-col>
            <v-toolbar>
              <v-toolbar-title>Education Details</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="setAddEducation = true" color="blue">Add Education</v-btn>
            </v-toolbar>
            <v-data-table :headers="headers" :items="formData.education"> </v-data-table>
          </v-col>
        </v-row>
        <v-row v-if="setAddEducation || !formData.education.length">
          <v-col cols="12" sm="6">
            <v-select
              v-model="educationObject.educationLevel"
              :items="educationLevel.filter(
                (level) => !formData.education.find((addedLevel) => addedLevel.educationLevel === level.code))"
              item-title="description"
              item-value="code"
              label="Education Level*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="educationObject.institution"
              label="University/College*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="educationObject.degree"
              label="Course Undertaken*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="educationObject.yearOfStart"
              label="Year of Start*"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="educationObject.yearOfGraduation"
              label="Year of Graduation*"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="secondary" width="300px" @click="addEducation"> Save </v-btn>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Professional Association Membership</h2>
            <p>Please provide your Professional Association Membership details.</p>
          </v-card-text>
        </v-card>
        <v-row v-if="formData.professionalBodys.length">
          <v-col>
            <v-toolbar>
              <v-toolbar-title>Professional Association Membership Details</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="setAddProfessionalAssociation = true" color="blue">
                Add Professional Association Membership
              </v-btn>
            </v-toolbar>
            <v-data-table :headers="headersProfessionalBody" :items="formData.professionalBodys">
            </v-data-table>
          </v-col>
        </v-row>
        <v-row v-if="setAddProfessionalAssociation || !formData.professionalBodys.length">
          <v-col cols="12" sm="6">
            <v-select
              v-model="professionalBodys.bodyName"
              :items="professionBody"
              label="Professional Body*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="professionalBodys.membershipNumber"
              label="Membership Number*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="professionalBodys.membershipType"
              :items="membershipTypes"
              label="Membership Type*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="secondary" width="300px" @click="addProfessionalBody">
              save
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              v-model="formData.currentlyEmployed"
              label="Are you currently employed? (this will not disadvantage you from getting an opportunity but needed for information only)"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0" v-if="formData.currentlyEmployed">
          <v-card-text>
            <h2>Work Experience</h2>
            <p>Please provide your work experience.</p>
          </v-card-text>
        </v-card>
        <v-row v-if="formData.currentlyEmployed">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.workExperience.companyName"
              label="Company Name*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.workExperience.jobTitle"
              label="Position*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              v-model="formData.workExperience.jobDescription"
              label="Type of work you are currently doing*"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Preferences</h2>
          </v-card-text>
          <v-row>
            <v-col cols="12">
            <v-checkbox
              v-model="formData.willingToWorkAnyWhere"
              label="Are you willing to work anywhere in Kenya?"
            ></v-checkbox>
          </v-col>
          </v-row>
        </v-card>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Application Attachments</h2>
            <p>Please upload the application attachments specified below.</p>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.coverLetter"
              accept=".pdf,.docx,.doc"
              label="Cover letter"
              required
              @change="setCoverLetter"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.cv"
              accept=".pdf,.docx,.doc"
              label="Curriculum Vitae"
              required
              @change="setCV"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="formData.attachments.certificate_testimonials"
              accept=".pdf,.docx,.doc"
              label="Certificates & testimonials (You can uploads multiple)"
              required
              @change="setCertificateTestimonials"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-card class="my-3" elevation="0">
          <v-card-text>
            <h2>Declaration</h2>
            <p>Please read and confirm the following:</p>
            <v-checkbox
              v-model="formData.declaration"
              label="I confirm the information provided herein are true and correct."
              required
            ></v-checkbox>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col>
            <v-btn  width="300px" color="primary" :disabled="!formData.declaration" @click="submitApplication"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </section>
  </main>
</template>

<style scoped>
</style>
