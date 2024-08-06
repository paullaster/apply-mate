<template>
   <section class="profile_toggle">
     <div class="profile_toggle_btn" @click="toggleProfile">
       <img :src="profileImage" alt="Profile picture" />
       <span>{{ profileName }}</span>
     </div>
     <div class="profile_toggle_content" :class="{ 'is-active': isActive }">
       Your profile content goes here 
     </div>
     <div class="profile_toggle_content" :class="{ 'is-active': isActive }">
       Your profile content goes here 
     </div>
     <div class="profile_toggle_content" :class="{ 'is-active': isActive }">
       Your profile content goes here 
     </div>
     <div class="profile_toggle_content" :class="{ 'is-active': isActive }">
       Your profile content goes here 
     </div>
   </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>