import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { _request } from "@/service";
import AuthService from "@/packages/auth/AuthService";
import router from "@/router";


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
                this.setLoader({ loading: true, root: true });
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
                await this.setLoader({ loading: false, root: true });
            }
        },
        async activateConsoltium(payload) {
            try {
                this.setLoader({ loading: true, root: true });
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
                await this.setLoader({ loading: false, root: true });
            }
        },
        async setPassword(payload) {
            try {
                this.setLoader({ loading: true, root: true });
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
                await this.setLoader({ loading: false, root: true });
            }
        }
    },
});