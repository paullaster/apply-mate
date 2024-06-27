<script setup>
import { ref } from "vue";

const formData = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  dob: '',
  pinNumber: '',
  countyOfBirth: '',
  physicalAddress: {
    countyOfResidence: '',
    constituency: '',
    street: '',
    city: '',
    estate: '',
    village: ''
  },
  profession: "",
  education: {
    educationLevel: "",
    institution: '',
    degree: '',
    yearOfStart: '',
    yearOfGraduation: '',
  },
  registeredProfessional: false,
  professionalBodys: {
    bodyName: '',
    membershipNumber: '',
    membershipType: '',
  },
  workExperience:{
    currentlyEmployed: false,
    companyName: '',
    jobTitle: '',
    jobDescription: '',
  },
  attachments: {
    coverLetter: '',
    cv: '',
    certificate_testimonials: '',
  },
  declaration: false,
});
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
  'Others',
];
const educationLevel = [
  'Select Education Level',
  'PHD',
  'Masters',
  'Bachelors',
  'Diploma',
  'Certificate',
];

const membershipTypes = [
  'Select Membership Type',
  'Corporate',
  'Graduate',
  'Licentiate',
  'Other',
];
const professionBody = [
  "Select Professional Body",
  "Institue of Engineers Kenya",
  "Other",
];
</script>
<template>
  <header>
    <h4> Please provide the following infomrtion to complete your application</h4>
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
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.firstName"
            label="First Name*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.middleName"
            label="Other Name*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.lastName"
            label="Last Name*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
          v-model="formData.dob"
          label="Date of Birth*"
          required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
          v-model="formData.pinNumber"
          label="KRA PIN Number*"
          required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
          v-model="formData.countyOfBirth"
          label="County of birth*"
          required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-card class="my-3" elevation="0">
        <v-card-text>
          <h2>Physical Address</h2>
          <p>Please provide your physical address.</p>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.countyOfResidence"
            label="County of Residence*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.constituency"
            label="Constituency*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.street"
            label="Street*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.city"
            label="City/Town*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.estate"
            label="Estate*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4"  md="4" sm="12">
          <v-text-field
            v-model="formData.physicalAddress.village"
            label="Flat or Apartment or Village*"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card class="my-3" elevation="0">
        <v-card-text>
          <h2>Profession & Education</h2>
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
          <v-select
            v-model="formData.education.educationLevel"
            :items="educationLevel"
            label="Education Level*"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.education.institution"
            label="University/College*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.education.degree"
            label="Course Undertaken*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.education.yearOfStart"
            label="Year of Start*"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.education.yearOfGraduation"
            label="Year of Graduation*"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card class="my-3" elevation="0">
        <v-card-text>
          <h2>Professional Body Membership</h2>
          <p>Please provide your professional body membership details.</p>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="formData.registeredProfessional" label="I am a Registered Professional?"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.professionalBodys.bodyName"
            :items="professionBody"
            label="Professional Body*"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.professionalBodys.membershipNumber"
            label="Membership Number*"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="formData.professionalBodys.membershipType"
            :items="membershipTypes"
            label="Membership Type*"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-card class="my-3" elevation="0">
        <v-card-text>
          <h2>Work Experience</h2>
          <p>Please provide your work experience.</p>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="formData.workExperience.currentlyEmployed" label="Are you currently employed? (this will not disadvantage you from getting an opportunity but needed for information only)"></v-checkbox>
        </v-col>
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
          <h2>Application Attachments</h2>
          <p>Please upload the application attachments specified below.</p>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="formData.attachments.coverLetter"
            accept=".pdf,.docx,.doc"
            label="Passport"
            required
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="formData.attachments.cv"
            accept=".pdf,.docx,.doc"
            label="Curriculum Vitae"
            required
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="formData.attachments.certificate_testimonials"
            multiple
            accept=".pdf,.docx,.doc"
            label="Certificates & testimonials (You can uplod multiple)"
            required
          ></v-file-input>
        </v-col>
      </v-row>
      <v-card class="my-3" elevation="0">
        <v-card-text>
          <h2>Declaration</h2>
          <p>Please read and confirm the following:</p>
          <v-checkbox v-model="formData.declaration" label="I confirm the information provided herein are true and correct." required></v-checkbox>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col>
          <v-btn color="primary" type="submit" :disabled="!formData.declaration">Submit</v-btn>
        </v-col>
      </v-row>
     </v-form>
   </section>
  </main>
</template>

<style scoped>

</style>
