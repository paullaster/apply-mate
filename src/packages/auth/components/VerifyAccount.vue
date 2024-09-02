<template>
    <v-card-title>Verify your {{}} account </v-card-title>
    <v-card-text>
    <div class="text-body-2">
      We sent a verification code to {{Helpers.mask(account.email)}} <br />

      Please check your email and paste the code below.
    </div>

    <v-sheet color="surface">
        <v-otp-input v-model="otp" type="text" variant="solo" ></v-otp-input>
    </v-sheet>

    <v-btn 
    class="my-4" 
    :color="ColorHelper.colorsHelper('primary')" 
    height="40" 
    text="Verify" 
    variant="flat" 
    width="100%" 
    @click="verifyOTP"
    :disabled="otp.length !== 6"
    ></v-btn>

    <div class="text-caption" >
      Didn't receive the code? <span v-if="seconds" :key="seconds">Resend after: {{ Helpers.countDownDisplay(seconds) }}</span> <a href="#" @click.prevent="otp = ''" v-else>Resend</a>
    </div>
  </v-card-text>
</template>

<script setup>
import { useAuth } from '@/stores';
import ColorHelper from '@/util/ColorHelper';
import { inject, onMounted, ref } from 'vue';
import { globalEventBus, useToast } from 'vue-toastification';
import Helpers from '@/util/Helpers';

// STORES
const authStore = useAuth();


// INJECTS
const account = inject('account');

// VARIS
const otp = ref('');
const seconds = ref(0);


// METHODS
onMounted(()=> {
  
  globalEventBus.on("start-resend-otp-timer", () => {
    console.log("Emmitted");
    // Start resending OTP timer
    const timer = 120;
    seconds.value = timer;
    console.log("Started", seconds.value);
    const interval = setInterval(() => {
      seconds.value--;
      if (seconds.value < 0) {
        clearInterval(interval);
        globalEventBus.emit("stop-resend-otp-timer", interval);
      }
    }, 1000);
  })

  globalEventBus.on("stop-resend-otp-timer", (interval) => {
    seconds.value = 0;
    clearInterval(interval);
  });
  globalEventBus.on('autologin-user', () => {
    // Auto login user
    authStore.login({email: account.value.email, password: account.value.password});
  });

})


// METHODS
function verifyOTP() {
  try {
    if (!otp.value) {
      return useToast().error("The OTP value is invalid!");
    }
    
    // Verify OTP
    authStore.verifyOTP({email:account.value.email, otp:otp.value});
    // Reset OTP
    otp.value = '';
    // Reset timer
    globalEventBus.emit("stop-resend-otp-timer", null);
    // authStore.updateUser({...account, isVerified: true });
  } catch (error) {
    console.error(error);
    useToast().error("Sorry, We ran into an error!");
  }
}



</script>