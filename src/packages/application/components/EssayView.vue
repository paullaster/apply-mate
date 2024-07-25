<template>
    <v-card flat>
        <h2> Housing not only provides shelter to Kenyans, but also is a great source of employment for citizens and generates demand for manufacturing</h2>
      <v-card-text>
        <v-textarea
          :readonly="true"
          :auto-grow="true"
          outlined
          class="long-text-editor"
          :value="Essay"
          :rows="essayRows"
        >
        </v-textarea>
      </v-card-text>
    </v-card>
  </template>
  <script setup>
  import { watch, ref } from 'vue';
  const props = defineProps({
    Essay: {
      type: String,
      default: null,

    },
  })

  const essayRows = ref(50);

  watch(
    () => props.Essay,
    (essay) => {
    if (essay) {
      console.log(essay);
      essayRows.value = props.Essay?.split('\n').length
    }
  }
)
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
  