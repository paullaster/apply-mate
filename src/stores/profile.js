import { defineStore } from "pinia";

export const useProfile = defineStore('profile', {
    state: () => ({
        activeProfileTab: 'BIODATA',
        profileSections: [
            {
                title: "Institution Information",
                icon: "mdi-school",
                value: "BIODATA",
            },
            {
                title: "Contact Person Information",
                icon: "mdi-cellphone",
                value: "CONTACT_INFO",
            },
            {
                title: "Accommodation Information",
                icon: "mdi-bed",
                value: "ACCOMMODATION_INFO",
            },
            {
                title: "Land Details",
                icon: "mdi-map-marker-radius",
                value: "LAND_INFO",
            },
            {
                title: "Declaration Form",
                icon: "mdi-list-box",
                value: "DECLARATION_FORM",
            },
            {
                title: "Sign",
                icon: "mdi-draw-pen",
                value: "SIGN_FORM",
            }
        ],
        profile: {},

    }),
    getters: {
        profileGetter: (state) => state.profile,
    },
    actions: {}
});