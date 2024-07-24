import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        loading: false,
        documentViewerDialog: {},
    }),
    getters: {
        globalStateGetter: (state) => (key) => state[key],
    },
    actions: {
        setLoading(payload) {
            try {
                this.$patch({ loading: payload });
            } catch (error) {
                useToast().success(error.message);
            }
        },
        resetLoading() {
            try {
                this.$patch({ loading: false });
            } catch (error) {
                useToast().success(error.message);
            }
        },
        setDocumentViewerDialog(dialog) {
            try {
                this.$patch({ documentViewerDialog: dialog });
            } catch (error) {
                useToast().success(error.message);
            }
        }
    }
})