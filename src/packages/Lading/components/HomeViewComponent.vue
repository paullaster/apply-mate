<template>
    <main class="landing-wrapper">
        <section>
            <h1>The Kenya Affordable Housing Program</h1>
            <p>A goverment initiative that aims to provide affordable housing for Kenyans</p>
            <div :class="lgAndUp ? 'cta-cards-wrapper big-screen' : 'cta-cards-wrapper small-screen'">
                <div class="cta-card">
                    <h2>See vacancies</h2>
                    <p>
                        Learn more about available  job and career opportunities at The Affordable Housing Program
                    </p>
                    <v-btn :color="ColorHelper.colorsHelper('primary')" class="btn" @click="()=>router.push({name: 'apply'})"  min-width="100%" >View vacancies</v-btn>
                </div>
                <div class="cta-card">
                    <h2>Consortium portal</h2>
                    <p>
                        Access a comprehensive database of consortia
                    </p>
                    <v-btn :color="ColorHelper.colorsHelper('primary')" class="btn" @click="()=>router.push({name: 'auth'})" min-width="100%">Login</v-btn>
                </div>
                <div class="cta-card">
                    <h2>University partner</h2>
                    <p>
                        Partner with State Department of Housing and Urban Development
                    </p>
                    <v-btn :color="ColorHelper.colorsHelper('primary')" class="btn" min-width="100%">Become a partner</v-btn>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import ColorHelper from '@/util/ColorHelper';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
// VUETIFY
const { lgAndUp } = useDisplay();

// ROUTING
const router = useRouter();

</script>

<style scoped>

</style>