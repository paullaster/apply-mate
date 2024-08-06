import { defineStore } from "pinia";
import { _request } from "@/service";
import { useToast } from "vue-toastification";
import constants from "./constants";
import { useGlobalStore } from "./global";


export const useApplication = defineStore('application', {
    state: () => ({
        applications: [],
        applicant: {},
        filteredApplication: [],
    }),
    getters: {
        applicationGetter: (state) => (key) => state[key],
    },
    actions: {
        setLoader(payload) {
            try {
                useGlobalStore().setLoader(payload);
            } catch (error) {
                useToast().error(error.message);
            }
        },
        getApplications(params = {}) {
           try {
            this.setLoader(true);
            _request.axiosRequest({
                url: constants.application,
                params,
            })
            .then((response) => {
                this.$patch({
                    applications: response.data.value,
                });
                this.setLoader(false);
            })
            .catch((error) => {
                this.setLoader(false);
                useToast().error(error.message);
            });
           } catch (error) {
            this.setLoader(false);
            useToast().error(error.message);
           }
        },
        async getApplicant(id) {
            try {
                this.setLoader(true);
               _request.axiosRequest({
                url: `${constants.applicant}/${atob(id)}`,
               })
               .then(res => {
                this.$patch({
                    applicant: res.data,
                });
                this.setLoader(false);
               })
               .catch(error => {
                this.setLoader(false);
                useToast().error(error.message);
               });
            } catch (error) {
                this.setLoader(false);
                useToast().error(error.message);
            }
        },
        async acceptApplicant(payload) {
            return await _request.axiosRequest({
                url: `/accept/application`,
                method: 'POST',
                data: payload,
            })
        },
        async batchAcceptApplications(payload) {
            return await _request.axiosRequest({
                url: `/batch/accept/applications`,
                method: 'POST',
                data: payload,
            })
        },
    },
})