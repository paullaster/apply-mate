import { _request } from "@/service";
import ColorHelper from "@/util/ColorHelper";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useGlobalStore } from "./global";
import { hostelRequest } from "./constants";
import router from "@/router";

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
                btnCaption: "Save Institution Information",
                formRef: 'biodata',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    console.log(payload);
                    useProfile().saveHostelRequesSection({
                        ...payload,
                        durationEachSemester: parseInt(payload.durationEachSemester),
                    })
                }
            },
            {
                title: "Contact Person Information",
                icon: "mdi-cellphone",
                value: "CONTACT_INFO",
                heading: "Contact Person Information",
                description: "Details of the primary contact persons",
                btnCaption: "Save Contact Information",
                formRef: 'contactorForm',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    this.saveHostelRequesSection(payload);
                }
            },
            {
                title: "Accommodation Information",
                icon: "mdi-bed",
                value: "ACCOMMODATION_INFO",
                heading: "Accommodation Information",
                description: "Details of the accommodation provided by the institution",
                btnCaption: "Save Accommodation Information",
                formRef: 'accommodationform',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    console.log(payload);
                }
            },
            {
                title: "Land Details",
                icon: "mdi-map-marker-radius",
                value: "LAND_INFO",
                heading: "Land Details",
                description: "Details of the land allocated for accommodation",
                btnCaption: "Save Declaration Form",
                formRef: 'ladinfoForm',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    console.log(payload);
                }
            },
            {
                title: "Declaration Form",
                icon: "mdi-list-box",
                value: "DECLARATION_FORM",
                heading: "Declaration Form",
                description: "Declaration by Institution Authority",
                btnCaption: "Submit Signed Application Form",
                formRef: 'declarationForm',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    console.log(payload);
                }
            },
            {
                title: "Sign",
                icon: "mdi-draw-pen",
                value: "SIGN_FORM",
                heading: "Signing Form",
                description: "Download the application form below to complete this section and then re-upload a duly completed signed application form",
                btnCaption: "Submit Signed Application Form",
                formRef: 'signForm',
                vmodel: {
                    institutionName: '',
                    campus: '',
                    durationEachSemester: '',
                    region: '',
                    county: '',
                    town: ''
                },
                fn: (payload) => {
                    console.log(payload);
                }
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
        setLoading(payload) {
            try {
                useGlobalStore().setLoader(payload);
            } catch (error) {
                useToast().error(error.message);
            }
        },
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
        async saveHostelRequesSection(paylaod) {
            this.setLoading(true);
            _request.axiosRequest({
                url: hostelRequest[this.activeProfileTab],
                method: 'POST',
                data: paylaod,
            })
            .then(() => {
                this.setLoading(false);
                useToast().success("Biodata information saved successfully!");
                const currentTabIndex = this.profileSections.findIndex(
                    (tab) => tab.value === this.activeProfileTab
                );
                const state = {
                    TAB: this.profileSections[currentTabIndex + 1],
                    LAST: router.push({ name: 'requests'})
                };
                if (currentTabIndex >= this.profileSections.length - 1 || currentTabIndex < 0) {
                    return state['LAST'];
                };
                this.$patch({
                    activeProfileTab : state['TAB'].value,
                })
            })
            .catch((error) => {
                console.error(error.message);
                this.setLoading(true);
                useToast().error("Error while saving information");
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