<template>
  <main class="spinner-container">
    <section class="spinner-wrapper">
      <img :src="LoaderGIF" alt=" Loader GIF" srcset="">
    </section>
  </main>
</template>

<script setup>
import LoaderGIF from "@/assets/images/loader.gif.webp";
</script>

<style scoped>
</style>