<template>
  <v-row flex class="justify-center">
    <v-dialog v-model="feedbackActions" max-width="800px" min-height="auto">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <h2 class="headline mb-4">Leave Feedback</h2>
              <v-form ref="feedbackForm">
                <v-textarea
                  v-model="feedback.comment"
                  label="Feedback Content"
                  :rules="rules.comment"
                ></v-textarea>
                <v-btn @click="submitFeedback" :color="ColorHelper.colorsHelper('primary')" :loading="isSubmitting"
                class="my-3"
                block
                  >
                  <v-icon class="mr-2">mdi-message-bulleted</v-icon>
                  <span>Leave feedback</span>
                  </v-btn
                >
              </v-form>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" sm="6">
             <h2 class="headline mb-4">Feedback History</h2>    
             <FeedbackDialog/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click=" feedbackActions = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { useAuth, useGlobalStore } from '@/stores'
import { storeToRefs } from 'pinia'
import FeedbackDialog from './FeedbackDialog.vue';

// STORES
const globalStore = useGlobalStore()
const authStore = useAuth()
const { feedbackActions, activeCommentable } = storeToRefs(globalStore)
const { user } = storeToRefs(authStore);
import { ref } from 'vue'
import ColorHelper from '@/util/ColorHelper';
import { useToast } from 'vue-toastification';

// COMPONENTN STATE
const feedback = ref({
    comment: ''
})
const feedbackForm = ref(null);
const isSubmitting = ref(false);

const rules = ref({
    comment: [
        v =>!!v || 'Feedback content is required.',
        v => v.length > 5 || `Feedback content is can not be less than 5 characters`,
        v => v.length <= 1000 || 'Feedback content should not exceed 1000 characters.'
    ]
})


// METHODS
async function submitFeedback(){
    try {
        isSubmitting.value = true;
        const { valid } = await feedbackForm.value.validate();
        if (!valid) {
            useToast().error("Please enter a valid feedback");
            isSubmitting.value = false;
            return;
        }
        const feedbackPayload = {
            comment: feedback.value.comment,
            reviewer: user.value.consoltium,
            documentNo: activeCommentable.value.no,
        }
        globalStore.leaveFeedback(feedbackPayload)
        .then(() =>{
            //  feedbackActions.value = false
             useToast().success('Feedback submitted successfully')
             feedback.value.comment = ''
             feedbackForm.value.resetFields();
             globalStore.fetchFeedbackHistory({documentNo: activeCommentable.value.no});
             isSubmitting.value = false
        });
    } catch (error) {
        console.log(error)
        useToast().error('Error while submitting feedback')
        isSubmitting.value = false
    }
}
</script>
