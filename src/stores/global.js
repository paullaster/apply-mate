import { _request } from "@/service";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useApplication } from "./application";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        loading: false,
        documentViewerDialog: {},
        searchDialog: false,
        profileToggle: false,
        feedbackActions: false,
        applicantQuickView: null,
        activeCommentable: {},
        feedbackHistory: [],
        searchQuery: {
            searchText: '',
            county: '',
            category: '',
            consortium: '',
        }
    }),
    getters: {
        globalStateGetter: (state) => (key) => state[key],
    },
    actions: {
        setQuickViewScreen(status, item) {
            try {
                this.$patch({
                    applicantQuickView: status,
                });
                useApplication().$patch({
                    applicant: item,
                })
            } catch (error) {
                useToast().error(error.message);
            }
        },
        setLoader(payload) {
            try {
                this.$patch({ loading: payload });
            } catch (error) {
                useToast().error(error.message);
            }
        },
        setFeedbackActionDialog(payload, commetable) {
            try {
                this.$patch({
                    feedbackActions: payload,
                    activeCommentable: commetable,
                });
            } catch (error) {
                useToast().error(error.message);
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
                useToast().error(error.message);
            }
        },
        resetLoading() {
            try {
                this.$patch({ loading: false });
            } catch (error) {
                useToast().error(error.message);
            }
        },
        setDocumentViewerDialog(dialog) {
            try {
                this.$patch({ documentViewerDialog: dialog });
            } catch (error) {
                useToast().error(error.message);
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
                useToast().error(error.message);
            }
        },
        leaveFeedback(payload) {
            try {
               return  _request.axiosRequest({
                    url: '/feedback/leave',
                    method: 'POST',
                    data: payload,
                })
            } catch (error) {
                console.error(error.message);
                useToast().error("Error while leaving feedback");
            }
        },
        fetchFeedbackHistory(params) {
            try {
                 _request.axiosRequest({
                    url: '/feedback/history',
                    method: 'GET',
                    params,
                })
                .then((response) => {
                    this.$patch({
                        feedbackHistory: response.data.value,
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                    useToast().error("Error while fetching feedback history");
                });
            } catch (error) {
                console.error(error.message);
                useToast().error("Error while fetching feedback history");
            }
        }
    }
})