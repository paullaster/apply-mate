import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        loading: false,
        documentViewerDialog: {},
        searchDialog: false,
        profileToggle: false,
        searchQuery: {
            searchText: '',
            county: '',
            category: '',
        }
    }),
    getters: {
        globalStateGetter: (state) => (key) => state[key],
    },
    actions: {
        setLoader(payload) {
            try {
                this.$patch({ loading: payload });
            } catch (error) {
                useToast().success(error.message);
            }
        },
        setSearchdialog(payload) {
            try {
                this.$patch({
                    searchQuery: {},
                });
                this.$patch({
                    searchDialog: payload,
                })
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
        },
        setProfileToggle() {
            try {
                document.addEventListener('click', (e)=> {
                    if (e.target.id === 'activate-toggle-btn-ctl-icon' || e.target.id === 'activate-toggle-btn-ctl') {
                        this.$patch({
                            profileToggle:!this.profileToggle,
                        });
                        return;
                    }else {
                        this.$patch({
                            profileToggle: false,
                        });
                    }
                    console.log(e.target.id)
                    this.$patch({
                        profileToggle: false,
                    });
                })
            } catch (error) {
                useToast().success(error.message);
            }
        }
    }
})