import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useDashboard = defineStore("dashboard", {
    state: () => ({
        links: [],
    }),
    getters: {
        dashboardDataGetter: (state) =>(key) =>state[key],
    },
    actions: {
        addLinks(payload) {
            try {
                this.$patch({
                    links: [...this.links, ...payload],
                });
            } catch (error) {
                useToast().error(error.message);
            }
        },
    },
});