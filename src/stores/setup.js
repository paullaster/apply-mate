import { _request } from "@/service";
import { defineStore } from "pinia";
import constants from "./constants";
import { useToast } from "vue-toastification";


const customError = "Sorry, We experienced an error!, Please try again later";
export const useSetupStore = defineStore('setup', {
    state:() => ({
        counties: [],
        filteredCounties: [],
        categories: [],
    }),
    getters: {
        setupDataGetter: (state) => (key) => state[key],
    },
    actions: {
        async getCouties() {
            try {
                _request.axiosRequest({
                    method: 'GET',
                    url: constants.counties,
                })
                .then((response) => {
                    this.$patch({
                        counties: response?.data?.data?.value,
                    });
                })
                .catch((error) => {
                    useToast().error(error?.response?.data?.message || error.message || customError);
                });
            } catch (error) {
                useToast().error( error.message || customError);
            }
        },
        async getCategories() {
            try {
                _request.axiosRequest({
                    method: 'GET',
                    url: constants.categories,
                })
                .then((response) => {
                    this.$patch({
                        categories: response?.data?.data?.value,
                    });
                })
                .catch((error) => {
                    useToast().error(error?.response?.data?.message || error.message || customError);
                });
            } catch (error) {
                useToast().error( error.message || customError);
            }
        },
    },
});