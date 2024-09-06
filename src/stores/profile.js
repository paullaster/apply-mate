import { _request } from "@/service";
import ColorHelper from "@/util/ColorHelper";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

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
        profileRecordsLoadingStatus: false,
        component: {
            status: false,
            description:"Add A Record",
            controls: {
                autocomplete: {
                    items: [],
                    label: "",
                    item_value: "",
                    item_title: "",
                    type: "",
                    required: false,
                    disabled: false,
                    options: [],
                },
                textField: {
                    label: "",
                    value: "",
                    type: "",
                    required: false,
                    disabled: false,
                },
                vmodel: {
                    autocomplete: '',
                    textField: '',
                },
                actions: {
                    caption: "",
                    icon: "",
                    disabled: false,
                    loading: false,
                    options: [],
                    color: "",
                    iconColor: "",
                    fn: function (v) { console.log(v);  },
                }
            }

        }

    }),
    getters: {
        profileGetter: (state) => state.profile,
    },
    actions: {
        setDialogComponent(data) {
            this.$patch({
                profileRecordsLoadingStatus: false,
            });
            switch(data) {
                case 'student':
                    this.$patch({
                        component: {
                            status: true,
                            description:"Add Students Data",
                            controls: {
                                autocomplete: {
                                    items: [
                                        {
                                            year: 1,
                                            description: "First Year",
                                        },
                                        {
                                            year: 2,
                                            description: "Second Year",
                                        },
                                        {
                                            year: 3,
                                            description: "Third Year",
                                        },
                                        {
                                            year: 4,
                                            description: "Fourth Year",
                                        },
                                        {
                                            year: 5,
                                            description: "Fifth Year",
                                        },
                                        {
                                            year: 6,
                                            description: "Sixth Year",
                                        },
                                        {
                                            year: 7,
                                            description: "Seventh Year",
                                        }
                                    ],
                                    label: "Student Information",
                                    item_value: "year",
                                    item_title: "description",
                                    type: "number",
                                    required: true,
                                    disabled: false,
                                    options: [],
                                },
                                textField: {
                                    type: 'number',
                                    label: "Number of Students",
                                    value: '',
                                    required: true,
                                    disabled: false,
                                },
                                vmodel: {
                                    autocomplete: '',
                                    textField: '',
                                },
                                actions: {
                                    caption: "Submit",
                                    disabled: false,
                                    options: [],
                                    color: ColorHelper.colorsHelper("primary"),
                                    icon:  "mdi-send",
                                    fn: async(payload)=>{
                                        await this.submitStudentRecord(payload)
                                        console.log(this.component)
                                    }
                                }
                            }
                        },
                    });
                    break;
                default:
            }
        },
        async getStudentRecord(){
            this.$patch({
                profileRecordsLoadingStatus: true,
            });
        },
        async submitStudentRecord(payload) {
            this.$patch({
                profileRecordsLoadingStatus: true,
            });
            const data = {
                yearOfStudy: parseInt(payload.autocomplete),
                totalNo: parseInt(payload.textField),
            }
            console.log(data)
            _request.axiosRequest({
                url: '/student/record/add',
                method: 'POST',
                data: data,
            })
           .then(() => {
             this.$patch({
                 profileRecordsLoadingStatus: false,
             });
             useToast().success("Student record submitted successfully!");
           })
            .catch((error) => {
                console.error(error.message);
                useToast().error("Error while submitting student record");
                this.setDialogComponent('student');
            });
            
        }
    }
});