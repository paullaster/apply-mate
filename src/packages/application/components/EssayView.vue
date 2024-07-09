<template>
    <v-card flat>
        <h2> {{ Essay.heading }}</h2>
      <v-card-text>
        <v-textarea
          :readonly="true"
          :auto-grow="true"
          outlined
          class="long-text-editor"
          :value="Essay.content"
        >
        </v-textarea>
      </v-card-text>
    </v-card>
  </template>
   <!-- :rows="initialLines" -->
  <script setup>
  defineProps({
    Essay: {
      type: Object,
      required: true,
    },
    initialLines: {
      type: Number,
      default: 10,
    },
  })
  </script>
  
  <style scoped>
  .long-text-editor {
    min-height: 200px; /* Adjust minimum height as needed */
    font-family: monospace; /* Optional: Monospace font for code-like appearance */
    background-color: #f5f5f5; /* Light background color for better readability */
    border: none; /* Remove border for cleaner look */
    resize: none; /* Disable resizing */
  }
  </style>
  