import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { _request } from "@/service";
import AuthService from "@/packages/auth/AuthService";

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
                    await this.setLoader({loading: false, root: true});
                })
            } catch (error) {
                useToast().error(error.message);
            }
        }
    },
});