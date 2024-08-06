<template>
    <v-data-table :headers="headers" :items="items" :items-per-page="5"></v-data-table>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Name', value: 'name' },
          // ... other headers
        ],
        items: [
          { id: 1, name: 'John Doe' },
          // ... other items
        ]
      };
    }
  };
  </script>
  