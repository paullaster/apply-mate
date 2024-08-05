import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { _request } from "@/service";
import AuthService from "@/packages/auth/AuthService";
import router from "@/router";
import { useGlobalStore } from "./global";


const customError = "Sorry, We experienced an error!, Please try again later";
export const useAuth = defineStore("auth", {
    state: () => ({
        user: {},
    }),
    getters: {
        authGetter: (state) => (key) => state[key],
    },
    actions: {
        setLoader(payload) {
            try {
                useGlobalStore().setLoader(payload);
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
        async logout() {
            try {
                this.$patch({
                    user: {},
                });
                await AuthService.logout();
            } catch (error) {
                useToast().error(error.message);
            }
        },
        async login(payload) {
            try {
                this.setLoader(true);
                _request.axiosRequest({
                    url: "/auth/login",
                    method: "POST",
                    data: payload,
                })
                    .then(async (response) => {
                        useToast().success(response.message);
                        AuthService.login(response.data).then(async(user) => {
                            await this.setUser(user);
                            router.push({
                                name: 'userLayout',
                                params: { user: btoa(user.id) },
                            });
                        })
                    })
                    .catch(async (error) => {
                        useToast().error(error?.response?.data?.message || error.message || customError);

                    });
            } catch (error) {
                useToast().error(error.message);
            } finally {
                this.setLoader(false);
            }
        },
        async activateConsoltium(payload) {
            try {
                this.setLoader(true);
                _request.axiosRequest({
                    url: "/auth/activate",
                    method: "POST",
                    data: payload,
                })
                    .then(async (response) => {
                        useToast().success(response.message);
                    })
                    .catch(async (error) => {
                        useToast().error(error?.response?.data?.message || error.message || customError);
                    });
            } catch (error) {
                useToast().error(error.message);
            } finally {
                this.setLoader(false);
            }
        },
        async resetPassword(payload) {
            try {
                this.setLoader(true);
                _request.axiosRequest({
                    url: "/auth/forgot-password",
                    method: "POST",
                    data: payload,
                })
                    .then(async (response) => {
                        useToast().success(response.message);
                    })
                    .catch(async (error) => {
                        useToast().error(error?.response?.data?.message || error.message || customError);
                    });
            } catch (error) {
                useToast().error(error.message);
            } finally {
                this.setLoader(false);
            }
        },
        async setPassword(payload) {
            try {
                this.setLoader(true);
                _request.axiosRequest({
                    url: "/auth/set-password",
                    method: "POST",
                    data: payload,
                })
                    .then(async (response) => {
                        useToast().success(response.message);
                        const { token, password } = payload;
                        const user = JSON.parse(atob(token.split(".")[1]));
                        console.log(user);
                        const loginCredentials = {
                            email: user.email,
                            password: password
                        }
                        this.login(loginCredentials);
                    })
                    .catch(async (error) => {
                        useToast().error(error?.response?.data?.message || error.message || customError);
                    });
            } catch (error) {
                useToast().error(error.message);
            } finally {
                this.setLoader(false);
            }
        }
    },
});