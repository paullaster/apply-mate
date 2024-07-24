<template>
    <v-row>
        <v-dialog v-model="documentViewerDialog.status">
            <v-card>
                <v-card-title>
                    <v-toolbar>
                        <v-toolbar-title>{{ documentViewerDialog?.document?.name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text @click="()=> globalStore.setDocumentViewerDialog({status: false, document: {}})">Close</v-btn>
                    </v-toolbar>
                </v-card-title>
                <v-card-text>
                  <iframe :src="documentViewerDialog.document?.link" width="100%" height="900px" :title="documentViewerDialog?.document?.name"></iframe>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { useGlobalStore } from '@/stores';
import { storeToRefs } from 'pinia';



// STORE
const globalStore = useGlobalStore();
const { documentViewerDialog } = storeToRefs(globalStore);

</script>

<style lang="scss" scoped>

</style>