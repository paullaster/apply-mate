<template>
    <main class="landing-wrapper">
        <section>
            <h1>The Kenya Affordable Housing Program</h1>
            <p>A goverment initiative that aims to provide affordable housing for Kenyans</p>
            <div :class="lgAndUp ? 'cta-cards-wrapper big-screen' : 'cta-cards-wrapper small-screen'">
                <div class="cta-card" style="position:relative;">
                    <h2>See vacancies</h2>
                    <p>
                        Learn more about available  job and career opportunities at The Affordable Housing Program
                    </p>

                    <!-- style="
                    position: absolute;
                    bottom: 12%;
                    right: 5%;
                    " -->
                    <v-btn
                    :color="ColorHelper.colorsHelper('primary')" class="btn"   @click="()=>router.push({name: 'apply'})" disabled min-width="90%" >View vacancies</v-btn>
                </div>
                <div class="cta-card" style="position:relative;">
                    <h2 style="display: flex; flex-direction: column;">
                        <span>Consortium</span> 
                        <span>&</span>
                        <span>HR portal</span>
                    </h2>
                    <p>
                        Access a comprehensive database of consortia
                    </p>
                    <!-- style="
                    position: absolute;
                    bottom: 12%;
                    right: 5%;
                    " -->
                    <v-btn
                    :color="ColorHelper.colorsHelper('primary')" class="" @click="()=>router.push({name: 'auth'})" min-width="90%">Login</v-btn>
                </div>
                <!-- <div class="cta-card" style="position:relative;">
                    <h2>University partner</h2>
                    <p>
                        Partner with State Department of Housing and Urban Development
                    </p>
                    <v-btn
                    style="
                    position: absolute;
                    bottom: 12%;
                    right: 5%;
                    "
                    :color="ColorHelper.colorsHelper('primary')" class="btn my-3" min-width="90%" @click="()=>router.push({name: 'register'})">Become a partner</v-btn>
                </div> -->
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