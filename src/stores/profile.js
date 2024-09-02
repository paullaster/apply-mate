import { defineStore } from "pinia";

export const useProfile = defineStore('profile', {
    state: () => ({
        activeProfileTab: 'BIODATA',
        profileSections: [
            {
                title: "Institution Information",
                icon: "mdi-school",
                value: "BIODATA",
                heading: "Institution Information",
                description: "Details of the institution",
            },
            {
                title: "Contact Person Information",
                icon: "mdi-cellphone",
                value: "CONTACT_INFO",
                heading: "Contact Person Information",
                description: "Details of the primary contact persons",
            },
            {
                title: "Accommodation Information",
                icon: "mdi-bed",
                value: "ACCOMMODATION_INFO",
                heading: "Accommodation Information",
                description: "Details of the accommodation provided by the institution",
            },
            {
                title: "Land Details",
                icon: "mdi-map-marker-radius",
                value: "LAND_INFO",
                heading: "Land Details",
                description: "Details of the land allocated for accommodation",
            },
            {
                title: "Declaration Form",
                icon: "mdi-list-box",
                value: "DECLARATION_FORM",
                heading: "Declaration Form",
                description: "Declaration by Institution Authority",
            },
            {
                title: "Sign",
                icon: "mdi-draw-pen",
                value: "SIGN_FORM",
                heading: "Signing Form",
                description: "Download the application form below to complete this section and then re-upload a duly completed signed application form",
            }
        ],
        profile: {},

    }),
    getters: {
        profileGetter: (state) => state.profile,
    },
    actions: {}
});