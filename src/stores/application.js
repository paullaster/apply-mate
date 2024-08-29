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
        totalItemsCount: 1,
        itemCount: 0,
        itemCountOnQuery: 0,
        currentPage: 1,
        nextPageToken: null,
        searchedAgainstAPI: false,

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
                            totalItemsCount: Math.ceil(response.data['@odata.count'] / 20),
                            itemCount: (response.data['@odata.count']),
                            nextPageToken: response.data['@odata.nextLink']?.split("?")[1],
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
        getApplicationsSync(params = {}) {
            try {
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
        async peerReviewApplication(payload) {
            return await _request.axiosRequest({
                url: `/peer/review/application`,
                method: 'POST',
                data: payload,
            })
        },
        async batchOnboardApplication(payload) {
            return await _request.axiosRequest({
                url: `/batch/peer/review/applications`,
                method: 'POST',
                data: payload,
            })
        },
        async recoverAttachments(payload) {
            return await _request.axiosRequest({
                url: `/recover/attachments`,
                method: 'POST',
                data: payload,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        async reverseOnboardedApplication(payload) {
            return await _request.axiosRequest({
                url: `/reverse/onboarded/application`,
                method: 'POST',
                data: payload,
            })
        },
        async batchReverseOnboardedApplications(payload) {
            return await _request.axiosRequest({
                url: `/batch/reverse/onboarded/applications`,
                method: 'POST',
                data: payload,
            })
        },
        async hrReviewApplication(payload) {
            return await _request.axiosRequest({
                url: `/hr/review/application`,
                method: 'POST',
                data: payload,
            })
        },
        async batchHRReviewedApplication(payload) {
            return await _request.axiosRequest({
                url: `/batch/hr/review/applications`,
                method: 'POST',
                data: payload,
            })
        },
        async applicationCustomFilter(params) {
            try {
                for (const [keys, value] of Object.entries(params)) {
                    if (!value) {
                        delete params[keys];
                    }
                }
                this.setLoader(true);
                _request.axiosRequest({
                    method: 'GET',
                    url: '/applications/filters',
                    params,
                })
                    .then(res => {
                        this.$patch({
                            filteredApplication: res.data.value,
                            totalItemsCount: Math.ceil(res.data['@odata.count'] / 20),
                            itemCountOnQuery: (res.data['@odata.count']),
                            nextPageToken: res.data['@odata.nextLink']?.split("?")[1],
                        });
                        this.setLoader(false);
                    })
                    .catch(error => {
                        this.setLoader(false);
                        console.error(error);
                        useToast().error("Error filtering application");
                    });
            } catch (error) {
                this.setLoader(false);
                console.error(error);
                useToast().error("Error filtering application");
            }
        },
        async goToNextFilteredPage() {
            try {
                this.setLoader(true);
                if (this.nextPageToken) {
                    const params = new URLSearchParams(this.nextPageToken);
                    this.currentPage++;
                    await this.applicationCustomFilter(params);
                }
            } catch (error) {
                this.setLoader(false);
                console.error(error);
                useToast().error("Error fetching next page");
            }
        }
    },
})