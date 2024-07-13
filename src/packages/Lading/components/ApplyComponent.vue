<template>
  <div class="landing">
    <header style="margin-top: 2rem; margin-bottom: 4rem">
      <div class="d-flex justify-content-center">
        <v-img
          :src="governLogo"
          alt="Government of Kenya Logo"
          style="max-width: 500px; margin-bottom: 2rem"
        ></v-img>
      </div>
      <div>
        <h1>GRADUATE INTERN RECRUITMENT UNDER THE AFFORDABLE HOUSING PROGRAM</h1>
        <p style="margin: 0.8rem 0">
          The Affordable Housing Programme (AHP) is an intervention to construct 200,000 homes for
          Kenyans by activating housing projects across the country. This in turn has generated the
          opportunity for engagement of young professionals in the built environment and related
          sectors.
        </p>
        <p style="margin: 0.8rem 0">
          The State Department for Housing and Urban Development (SDHUD) is therefore pleased to
          announce the recruitment drive of up to 10,000 university graduates in various Lots. This
          Lot 1 seeks to recruit 4000 interns . The interns will work under the supervision of
          professional consultants already engaged and contracted by SDHUD.
        </p>
        <p style="margin: 0.8rem 0">
          The recruitment will bring on board young people to work as interns in the following areas
          of proficiency:
        </p>
        <ol class="listing" style="padding-left: 1.6rem">
          <li>Architecture</li>
          <li>Quantity Surveying</li>
          <li>Construction Management</li>
          <li>Civil Engineering</li>
          <li>Structural Engineering</li>
          <li>Mechanical Engineering</li>
          <li>Electrical Engineering</li>
          <li>Land Surveyors</li>
          <li>Geoinformatics</li>
          <li>Landscape Architecture</li>
          <li>Interior Design</li>
          <li>Social Development</li>
          <li>Urban and Regional Planning</li>
          <li>Environmental Scientists</li>
          <li>Health and Safety</li>
          <li>Communication and Branding</li>
          <li>ICT</li>
        </ol>
      </div>
      <div style="margin: 0.8rem 0">
        <h2>Requirements for Appointment</h2>
        <p>
          For appointment to a graduate internship position, a candidate must have at least a
          Bachelor’s degree in the above outlined disciplines from a recognized university;
        </p>
      </div>
      <div style="margin: 0.8rem 0">
        <h2>Duration of Internship</h2>
        <p>The duration is for twelve (12) months.</p>
      </div>
      <div style="margin: 0.8rem 0">
        <h2>Remuneration</h2>
        <p>
          The interns will be remunerated in accordance with terms governing internship as per
          Public Service Commission.
        </p>
      </div>
      <div style="margin: 0.8rem 0">
        <h2>Mentorship and Certification</h2>
        <p>
          The interns working under registered professionals, will maintain work portfolios which
          will form part of requirements leading to professional examination and registration. On
          successful completion of the Internship Programme, the interns will be issued with a
          certificate.
        </p>
      </div>
    </header>
    <main>
      <section>
        <h4>Please provide the following information to complete your application</h4>
        <p>All the fields marked with (*) must be provided!</p>
      </section>
      <section style="margin-bottom: 2rem">
        <v-form ref="applicationForm">
          <v-card class="my-3" elevation="0">
            <v-card-text>
              <h2>Personal Details</h2>
              <p>Please provide your personal details.</p>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.firstName"
                label="First Name*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field v-model="formData.middleName" label="Other Name*"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.lastName"
                label="Last Name*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.dob"
                label="Date of Birth*"
                type="date"
                :rules="formValidate.date"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.idNumber"
                label="ID Number*"
                :rules="formValidate.required"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field v-model="formData.pinNumber" label="KRA PIN Number*"> </v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-select
                v-model="formData.countyOfOrigin"
                label="County of Origin*"
                :items="counties"
                item-value="CountyNo"
                item-title="countyName"
                :rules="formValidate.required"
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-radio-group v-model="formData.gender" :rules="formValidate.required">
                <template v-slot:label>
                  <p>Are you</p>
                </template>
                <template v-for="(item, index) in gender" :key="index">
                  <v-radio :value="item" :label="item"></v-radio>
                </template>
              </v-radio-group>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <div class="isdisabled_container">
                <div><span></span></div>
                <div>
                  <v-radio-group v-model="formData.disabled" :rules="formValidate.required">
                    <template v-slot:label>
                      <p>Are you a person living with a disability?</p>
                    </template>
                    <template v-for="(item, index) in disabilityOptions" :key="index">
                      <v-radio :value="item.code" :label="item.description"></v-radio>
                    </template>
                  </v-radio-group>
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
                v-model="formData.email"
                label="Email Address*"
                type="email"
                :rules="formValidate.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <v-text-field
                v-model="formData.phoneNumber"
                label="Phone Number*"
                type="tel"
                :rules="formValidate.phone"
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
              <v-select
                v-model="formData.physicalAddress.countyOfResidence"
                :items="counties"
                item-value="CountyNo"
                item-title="countyName"
                label="County of Residence*"
                :rules="formValidate.required"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.physicalAddress.constituency"
                label="Constituency*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.physicalAddress.street"
                label="Street*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.physicalAddress.city"
                label="City/Town*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.physicalAddress.estate"
                label="Estate*"
                :rules="formValidate.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-text-field
                v-model="formData.physicalAddress.village"
                label="Flat or Apartment or Village*"
                :rules="formValidate.required"
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
                :items="categories"
                item-value="code"
                item-title="description"
                label="Profession*"
                :rules="formValidate.required"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" v-if="formData.profession === 'OTHERS'">
              <v-text-field
                v-model="otherProfession"
                placeholder="Other support profession"
              ></v-text-field>
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
              <v-data-table :headers="headers" :items="formData.education">
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn variant="text" @click="deleteItem(item, 'education')"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row v-if="setAddEducation || !formData.education.length">
            <v-col cols="12" sm="6">
              <v-select
                v-model="educationObject.educationLevel"
                :items="
                  educationLevel.filter(
                    (level) =>
                      !formData.education.find(
                        (addedLevel) => addedLevel.educationLevel === level.code
                      )
                  )
                "
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
                :rules="formValidate.yearOfStart"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="educationObject.yearOfGraduation"
                label="Year of Graduation*"
                type="number"
                :rules="formValidate.yearOfGraduation"
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
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn variant="text" @click="deleteItem(item, 'professionalBodys')"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </template>
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
            <v-col cols="12" sm="6" v-if="professionalBodys.bodyName === 'Other'">
              <v-text-field
                v-model="otherMembershipBody"
                label="Other membership body*"
                required
              ></v-text-field>
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
            <v-col cols="12" sm="6" v-if="professionalBodys.membershipType === 'Other'">
              <v-text-field
                v-model="othermembershipType"
                label="Other membership type*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn color="secondary" width="300px" @click="addProfessionalBody"> save </v-btn>
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
              <h2>Write an Essay</h2>
              <p>Write 500 words essay on the subject:</p>
              <h3>{{ formData.essay.heading }}</h3>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col col="12">
              <v-textarea
                v-model="formData.essay.content"
                placeholder="Write your essay here."
                :maxlength="maxLength"
                @input="checkWordLimit"
                auto-grow
                required
              >
              </v-textarea>
              <sub style="display: block; margin-top: -0.8rem; background-color: red"
                >{{ wordCount }} / 500 words</sub
              >
            </v-col>
          </v-row>
          <v-card class="my-4" elevation="0">
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
              <v-btn
                width="300px"
                color="primary"
                :disabled="!formData.declaration || submitingStatus"
                @click="submitApplication"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </section>
    </main>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { BASEAPIURL } from '@/environment'
import governLogo from '@/assets/images/government-logo.png'
import { useSetupStore } from '@/stores'
import { storeToRefs } from 'pinia'

// STATUS
const submitingStatus = ref(false)

// STORE
const setupStore = useSetupStore()

const { counties, categories } = storeToRefs(setupStore)

// STORE ACTIONS

const formData = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  dob: '',
  idNumber: '',
  pinNumber: '',
  countyOfOrigin: '',
  gender: '',
  disabled: '',
  phoneNumber: '',
  email: '',
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
    coverLetter: {},
    cv: {},
    certificate_testimonials: {}
  },
  declaration: false,
  willingToWorkAnyWhere: false,
  essay: {
    heading:
      'Housing not only provides shelter to Kenyans, but also is a great source of employment for citizens and generates demand for manufacturing',
    content: ''
  }
})
const otherProfession = ref('')
const educationObject = ref({
  educationLevel: null,
  institution: null,
  degree: null,
  yearOfStart: null,
  yearOfGraduation: null
})
const professionalBodys = ref({
  bodyName: null,
  membershipNumber: null,
  membershipType: null
})
const otherMembershipBody = ref('')
const othermembershipType = ref('')
const educationPayloadValid = ref(false)
const essayPayloadValid = ref(false)
const attachmentsPayloadInvalid = ref(true)
const addressPayloadInvalid = ref(true)
const workExperiencePayloadInvalid = ref(true)
const applicationForm = ref(null)

const gender = ['Male', 'Female', 'Intersex']
const disabilityOptions = [
  { code: 'Yes', description: 'Yes' },
  { code: 'No', description: 'No' },
  { code: 'Prefer-Not-To-Say', description: 'prefer not to answer' }
]
const educationLevel = [
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
  },
  {
    title: 'Action',
    value: 'action'
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
  },
  {
    title: 'Action',
    value: 'action'
  }
]

const membershipTypes = ['Corporate', 'Graduate', 'Licentiate', 'Other']
const professionBody = ['Institue of Engineers of Kenya', 'Other']
const coverLetterBase64 = ref('')
const cvBase64 = ref('')
const certificateTestimonialsBase64 = ref('')
const showEducationForm = ref(true)
const showProfessionalAssociationForm = ref(true)
const wordCount = ref(0)
const maxLength = ref(5000)

// COMPUTED
const setAddEducation = computed({
  get: () => showEducationForm.value,
  set: (value) => (showEducationForm.value = value)
})

const setAddProfessionalAssociation = computed({
  get: () => showProfessionalAssociationForm.value,
  set: (value) => (showProfessionalAssociationForm.value = value)
})

const formValidate = computed(() => ({
  required: [(v) => !!v || 'required field'],
  email: [
    (v) => !!v || 'Email is required',
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
  ],
  phone: [
    (v) => !!v || 'Phone number is required',
    (v) => /^\+254\d{9}$/.test(v) || 'Invalid phone number format. Start with +254'
  ],
  date: [
    (v) => !!v || 'Date is required',
    (v) => new Date(v).getTime() < new Date('2006-12-31').getTime() || 'Invalid date of birth'
  ],
  yearOfStart: [
    (v) => !!v || 'Year of start is required',
    (v) => Number(v) > 2000 || 'Invalid year of start'
  ],
  yearOfGraduation: [
    (v) => !!v || 'Year of graduation is required',
    (v) => Number(v) > 2000 || 'Invalid year of graduation',
    (v) => 2025 > Number(v) || 'Invalid year of graduation'
  ]
}))

const educationTableLength = computed(() => formData.value.education.length)
const professionalBodysTableLength = computed(() => formData.value.professionalBodys.length)
// WATCH
watch(educationTableLength, (value) => {
  if (value && value > 0) {
    setAddEducation.value = false
  }
})
watch(professionalBodysTableLength, (value) => {
  if (value && value > 0) {
    setAddProfessionalAssociation.value = false
  }
})

// METHODS

function deleteItem(item, type) {
  try {
    switch (type) {
      case 'education':
        formData.value.education = formData.value.education.filter(
          (edu) => edu.educationLevel !== item.educationLevel
        )
        break
      case 'professionalBodys':
        formData.value.professionalBodys = formData.value.professionalBodys.filter(
          (bdy) => bdy.membershipNumber !== item.membershipNumber
        )
        break
      default:
        useToast().error('Invalid type')
        break
    }
  } catch (error) {
    useToast().error(error.message)
  }
}
async function setCoverLetter() {
  try {
    coverLetterBase64.value = ''
    if (formData.value.attachments.coverLetter.size > 10485760) {
      useToast().error('Cover letter file size exceeds 10MB')
      return
    }
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
    cvBase64.value = ''
    if (formData.value.attachments.cv.size > 10485760) {
      useToast().error('CV file size exceeds 10MB')
      return
    }
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
    certificateTestimonialsBase64.value = ''
    if (formData.value.attachments.certificate_testimonials.size > 10485760) {
      useToast().error(' Other certificates file size exceeds 10MB')
      return
    }
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
    const { valid } = await applicationForm.value.validate()
    await validateEducationPayload(formData.value.education)
    await validateEssayPayload(formData.value.essay)
    await validateAddressPayload(formData.value.physicalAddress)
    await validateAttachmentsPayload()
    await validateWorkExperiencePayload(formData.value.workExperience)
    if (!valid) {
      useToast().error('Please add all the required fields')
      return
    }
    if (!educationPayloadValid.value) {
      useToast().error('You add must your Bachelors education level!')
      return
    }
    if (!essayPayloadValid.value) {
      useToast().error('You must write the requested essay to complete your application!')
      return
    }

    if (addressPayloadInvalid.value) {
      useToast().error('Please fill out all fields for Address!')
      return
    }

    if (attachmentsPayloadInvalid.value) {
      useToast().error('You must upload both CV and cover letter!')
      return
    }

    if (workExperiencePayloadInvalid.value) {
      useToast().error("uuuuuugh!!!, You said you're currently employed?")
      return
    }
    let dob = new Date(formData.value.dob)
    submitingStatus.value = true
    const response = await axios.request({
      method: 'post',
      url: '/application',
      baseURL: BASEAPIURL,
      data: {
        ...formData.value,
        profession:
          formData.value.profession === 'Other support professions'
            ? otherProfession.value
            : formData.value.profession,
        attachments: {
          certificate_testimonials: certificateTestimonialsBase64.value.split(',')[1],
          cv: cvBase64.value.split(',')[1],
          coverLetter: coverLetterBase64.value.split(',')[1]
        },
        dob: dob
      }
    })
    useToast().success(response?.data?.message)
    formData.value = {}
  } catch (error) {
    useToast().error(
      error.response?.data?.message ||
        error.message ||
        'Sorry, We could not submit your application at this time!, Please try again later!'
    );
    if (error.response?.data?.message.includes("cannot be null")) {
      window.location.reload(true);
    }
  } finally {
    submitingStatus.value = false
  }
}
function addEducation() {
  try {
    const edLevel = educationLevel.findIndex(
      (levelObject) => levelObject.code === educationObject.value.educationLevel
    )
    if (edLevel === -1) {
      useToast().error('Invalid Education Level')
      return
    }
    if (
      !Number(educationObject.value.yearOfStart) ||
      !Number(educationObject.value.yearOfGraduation)
    ) {
      useToast().error('Year of Start and Year of Graduation are required')
      return
    }
    for (let prop in educationObject.value) {
      if (!educationObject.value[prop]) {
        useToast().error(
          `Please fill out all fields for Education ${educationObject.value.educationLevel} ${educationObject.value.degree}`
        )
        return
      }
      if (educationObject.value[prop] === "NA") {
        useToast().error(
          `Invalid values`
        )
        return
      }
      const na = /N([^a-zA-Z0-9])A/;
      if (na.test(educationObject.value[prop])) {
        useToast().error(`Invalid character found in ${prop}`)
        return;
      }
      const space = /\s/
      let emptySpace = false
      educationObject.value[prop]
        .trim()
        .split('')
        .forEach((c) => {
          if (space.test(c)) {
            emptySpace = true;
          }
        })
      if (emptySpace) {
        useToast().error("You just added empty spaces, do better next time!");
        return
      }
    }
    if (
      Number(educationObject.value.yearOfStart) >= Number(educationObject.value.yearOfGraduation)
    ) {
      useToast().error('Year of Start cannot be later than Year of Graduation')
      return
    }
    if (Number(educationObject.value.yearOfStart) < 2000) {
      useToast().error('Invalied value for Year of Start')
      return
    }
    if (
      Number(educationObject.value.yearOfGraduation) < 2000 ||
      Number(educationObject.value.yearOfGraduation) > 2024
    ) {
      useToast().error('Invalied value for Year of Graduation')
      return
    }
    educationObject.value.yearOfStart = Number(educationObject.value.yearOfStart)
    educationObject.value.yearOfGraduation = Number(educationObject.value.yearOfGraduation)
    formData.value.education.push(educationObject.value)
    educationObject.value = {}
  } catch (error) {
    useToast().error(error.message)
  }
}

function addProfessionalBody() {
  try {
    for (let prop in professionalBodys.value) {
      if (!professionalBodys.value[prop] || professionalBodys.value[prop] === ' ') {
        useToast().error(`Please fill out all fields.`)
        return
      }
    }
    professionalBodys.value.bodyName =
      professionalBodys.value.bodyName === 'Other'
        ? otherMembershipBody.value
        : professionalBodys.value.bodyName
    professionalBodys.value.membershipType =
      professionalBodys.value.membershipType === 'Other'
        ? othermembershipType.value
        : professionalBodys.value.membershipType
    formData.value.professionalBodys.push(professionalBodys.value)
    professionalBodys.value = {}
  } catch (error) {
    useToast().error(error.message)
  }
}

function checkWordLimit() {
  const words = formData.value.essay.content.split(/\s+/).filter((word) => word.length > 0)
  wordCount.value = words.length
  if (wordCount.value > maxLength.value) {
    formData.value.essay.content = words.slice(0, maxLength.value).join(' ')
    wordCount.value = maxLength.value
  }
}

async function validateEducationPayload(education) {
  try {
    education.forEach((level) => {
      if (level.educationLevel === 'BACHELORS') {
        educationPayloadValid.value = true
      }
    })
  } catch (error) {
    useToast().error('Please make sure your education information is correct')
  }
}
async function validateEssayPayload(essay) {
  try {
    if (essay.content !== '') {
      essayPayloadValid.value = true
    }
  } catch (error) {
    useToast().error('Please check you essay!')
  }
}

async function validateAddressPayload(address) {
  try {
    for (let prop in address) {
      if (address[prop] === '') {
        addressPayloadInvalid.value = true
      } else {
        addressPayloadInvalid.value = false
        break
      }
    }
  } catch (error) {
    useToast().error('Please provide correct address information')
  }
}

async function validateAttachmentsPayload() {
  try {
    if (cvBase64.value === '' || coverLetterBase64.value === '') {
      attachmentsPayloadInvalid.value = true
    } else {
      attachmentsPayloadInvalid.value = false
    }
  } catch (error) {
    useToast().error('Please check you attachments')
  }
}

async function validateWorkExperiencePayload(workExperience) {
  try {
    if (!formData.value.currentlyEmployed) {
      workExperiencePayloadInvalid.value = false
      return
    }
    for (let prop in workExperience) {
      if (workExperience[prop] === '') {
        workExperiencePayloadInvalid.value = true
      } else {
        workExperiencePayloadInvalid.value = false
        break
      }
    }
  } catch (error) {
    useToast().error('Add your current employment work experience')
  }
}

// STORE ACTIONS
setupStore.getCouties()
setupStore.getCategories()
</script>
<style scoped>
.landing {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
.listing {
  font-style: italic;
}
@media (min-width: 1001px) {
  .listing {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
