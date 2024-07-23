import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { _request } from "@/service";
import AuthService from "@/packages/auth/AuthService";


const customError = "Sorry, We experienced an error!, Please try again later";
export const useAuth = defineStore("auth", {
    state: () => ({
        user: {},
    }),
    getters: {
        authGetter: (state) => (key) => state[key],
    },
    actions: {
        async setLoader(payload) {
            try {
                this.$patch({
                    [payload.key]: payload.value,
                });
            } catch (error) {
                useToast().error(error.message);
            }
        },
        async setUser(payload) {
            try {
                this.$patch({
                    user: payload,
                });
            } catch (error) {
                useToast().error(error.message);
            }
        },
        logout() {
            try {
                this.$patch({
                    user: {},
                });
            } catch (error) {
                useToast().error(error.message);
            }
        },
        async login(payload) {
            try {
                this.setLoader({loading: true, root: true});
                _request.axiosRequest({
                    url: "/auth/login",
                    method: "POST",
                    data: payload,
                })
                .then(async (response) => {
                    await AuthService.login(response.data);
                    await this.setUser(response.data.user);
                })
                .catch(async (error) => {
                    useToast().error(error?.response?.data?.message || error.message || customError);
                    
                });
            } catch (error) {
                useToast().error(error.message);
            }finally {
                await this.setLoader({loading: false, root: true});
            }
        },
        async activateConsoltium(payload) {
            try {
                this.setLoader({loading: true, root: true});
                _request.axiosRequest({
                    url: "/auth/activate",
                    method: "POST",
                    data: payload,
                })
                .then(async (response) => {
                    useToast().success(response.data.message);
                })
                .catch(async (error) => {
                    useToast().error(error?.response?.data?.message || error.message || customError);
                });
            } catch (error) {
                useToast().error(error.message);
            }finally {
                await this.setLoader({loading: false, root: true});
            }
        },
        async setPassword(payload) {
            try {
                this.setLoader({loading: true, root: true});
                _request.axiosRequest({
                    url: "/auth/set-password",
                    method: "POST",
                    data: payload,
                })
                .then(async (response) => {
                    useToast().success(response.data.message);
                    await this.login(payload);
                })
                .catch(async (error) => {
                    useToast().error(error?.response?.data?.message || error.message || customError);
                });
            } catch (error) {
                useToast().error(error.message);
            }finally {
                await this.setLoader({loading: false, root: true});
            }
        }
    },
});