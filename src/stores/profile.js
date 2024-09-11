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
                    title: "",
                    eMail: "",
                    fullName: "",
                    phone: "",
                    address: ""
                },
                fn: (payload) => {
                    useProfile().saveHostelRequesSection({
                        ...payload,
                        documentNo: useProfile().profile.no
                    }, 'POST');
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
        accommodationInformationDataRecord: [],
        customComponent: {
            status: false,
            description: "Add A Record",
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
                    fn: function (v) { console.log(v); },
                }
            }

        },
        hostelRequests: [],
        studentDataRecord: [],

    }),
    getters: {
        profileGetter: (state) => state.profile,
        activeProfileTabIndex: (state) => state.profileSections.findIndex(section => section.value === state.activeProfileTab),
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
            switch (data) {
                case 'student':
                    this.$patch({
                        component: {
                            status: true,
                            description: "Add Students Data",
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
                                    cancel: {
                                        caption: "Cancel",
                                        disabled: false,
                                        options: [],
                                        color: ColorHelper.colorsHelper("light"),
                                        icon: "mdi-close-circle",
                                        fn: async () => {
                                            this.$patch({
                                                component: {
                                                    status: false,
                                                    controls: {}
                                                },
                                            })
                                        }
                                    },
                                    submit: {
                                        caption: "Submit",
                                        disabled: false,
                                        options: [],
                                        color: ColorHelper.colorsHelper("primary"),
                                        icon: "mdi-send",
                                        fn: async (payload) => {
                                            await this.submitStudentRecord(payload)
                                            console.log(this.component)
                                        }
                                    }
                                }
                            }
                        },
                    });
                    break;
                case 'accommodationUnits':
                    this.$patch({
                        customComponent: {
                            status: true,
                            description: "Add Accommodation Units Information",
                            controls: [
                                {
                                    prop: 'type',
                                    component: 'v-autocomplete',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        items: [
                                            {
                                                type: 'Current',
                                                description: "Current",
                                            },
                                            {
                                                type: "Proposed",
                                                description: "Proposed",
                                            },
                                        ],
                                        label: "Proposed or Current Accommodation",
                                        'item-value': "type",
                                        'item-title': "description",
                                        type: "string",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 12,
                                },
                                {
                                    prop: 'hostType',
                                    component: 'v-autocomplete',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        items: [
                                            {
                                                type: 'Student',
                                                description: "Student Accommodation",
                                            },
                                            {
                                                type: "Staff",
                                                description: "Staff Accommodation",
                                            },
                                        ],
                                        label: "For Students or Staff?",
                                        'item-value': "type",
                                        'item-title': "description",
                                        type: "string",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 12,
                                },
                                {
                                    prop: 'units',
                                    component: 'v-text-field',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        type: 'number',
                                        label: "Accommodation Units",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 6,
                                },
                                {
                                    prop: 'capacity',
                                    component: 'v-text-field',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        type: 'number',
                                        label: "Capacity",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 6,
                                },
                                {
                                    prop: 'chargesPerSemester',
                                    component: 'v-text-field',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        type: 'number',
                                        label: "Charges per Semester",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 12,
                                },
                                {
                                    prop: 'description',
                                    component: 'v-text-field',
                                    model: '',
                                    options: {
                                        variant: 'outlined',
                                        label: "Description",
                                        required: true,
                                        disabled: false,
                                    },
                                    cols: 12,
                                }

                            ],
                            actions: {
                                cancel: {
                                    caption: "Cancel",
                                    disabled: false,
                                    options: [],
                                    color: ColorHelper.colorsHelper("light"),
                                    icon: "mdi-close-circle",
                                    fn: async () => {
                                        this.$patch({
                                            component: {
                                                status: false,
                                                controls: {}
                                            },
                                        })
                                    }
                                },
                                submit: {
                                    caption: "Submit",
                                    disabled: false,
                                    options: [],
                                    color: ColorHelper.colorsHelper("primary"),
                                    icon: "mdi-send",
                                    fn: async () => {
                                        let payload = {};
                                        this.customComponent.controls.forEach((control) => {
                                            payload[control.prop] = control.model
                                        })
                                        payload['documentNo'] = this.profile.no;
                                        payload = {
                                            ...payload,
                                            units: parseInt(payload.units),
                                            capacity: parseInt(payload.capacity),
                                            chargesPerSemester: parseInt(payload.chargesPerSemester),
                                        }
                                        console.log(payload)
                                        await this.submitAccommodationRecord(payload)
                                    }
                                }
                            }
                        },
                    });
                    break;
                default:
            }
        },
        async getStudentRecord() {
            this.setLoading(true);
            this.$patch({
                profileRecordsLoadingStatus: true,
            });
            _request.axiosRequest({
                url: '/hostel/request/student',
                method: 'GET',
            })
                .then((res) => {
                    this.$patch({
                        studentDataRecord: res.data.value,
                        profileRecordsLoadingStatus: false,
                    });
                    this.setLoading(false);
                })
                .catch((error) => {
                    this.$patch({
                        profileRecordsLoadingStatus: false,
                    });
                    this.setLoading(false);
                    useToast().error(error.message);
                });
        },
        async saveHostelRequesSection(paylaod, method = 'POST') {
            this.setLoading(true);
            _request.axiosRequest({
                url: hostelRequest[this.activeProfileTab],
                method: method,
                data: paylaod,
            })
                .then((res) => {
                    this.setLoading(false);
                    this.$patch({
                        profile: res.data,
                    });
                    useToast().success("Biodata information saved successfully!");
                    const currentTabIndex = this.profileSections.findIndex(
                        (tab) => tab.value === this.activeProfileTab
                    );
                    const state = {
                        TAB: this.profileSections[currentTabIndex + 1],
                        LAST: router.push({ name: 'requests' })
                    };
                    if (currentTabIndex >= this.profileSections.length - 1 || currentTabIndex < 0) {
                        return state['LAST'];
                    };
                    this.$patch({
                        activeProfileTab: state['TAB'].value,
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
                documentNo: this.profile.no,
            }
            _request.axiosRequest({
                url: '/hostel/request/student',
                method: 'POST',
                data: data,
            })
                .then(() => {
                    this.$patch({
                        profileRecordsLoadingStatus: false,
                    });
                    this.$patch({
                        component: {
                            status: false,
                            controls: {}
                        },
                    });
                    useToast().success("Student record submitted successfully!");
                    this.getStudentRecord();
                })
                .catch((error) => {
                    console.error(error.message);
                    useToast().error("Error while submitting student record");
                    this.setDialogComponent('student');
                });

        },
        async getAccommodationRecords(){
            this.setLoading(true);
            this.$patch({
                profileRecordsLoadingStatus: true,
            });
            _request.axiosRequest({
                url: '/hostel/request/accommodation',
                method: 'GET',
            })
                .then((res) => {
                    this.$patch({
                        accommodationInformationDataRecord: res.data.value,
                        profileRecordsLoadingStatus: false,
                    });
                    this.setLoading(false);
                })
                .catch((error) => {
                    this.$patch({
                        profileRecordsLoadingStatus: false,
                    });
                    this.setLoading(false);
                    useToast().error(error.message);
                });
        },
        async submitAccommodationRecord(payload) {
            this.$patch({
                profileRecordsLoadingStatus: true,
            });
            _request.axiosRequest({
                url: '/hostel/request/accommodation',
                method: 'POST',
                data: payload,
            })
                .then(() => {
                    this.$patch({
                        profileRecordsLoadingStatus: false,
                    });
                    this.$patch({
                        customComponent: {
                            status: false,
                            controls: []
                        },
                    });
                    useToast().success("Accommodation record submitted successfully!");
                    this.getAccommodationRecords();
                })
                .catch((error) => {
                    console.error(error.message);
                    useToast().error("Error while submitting accommodation record");
                    this.setDialogComponent('accommodationUnits');
                });

        },
        async getHostelRequests() {
            this.setLoading(true);
            _request.axiosRequest({
                url: '/hostel/request/',
                method: 'GET',
            })
                .then((res) => {
                    this.$patch({
                        hostelRequests: res.data.value,
                        profileRecordsLoadingStatus: false,
                    });
                    this.setLoading(false);
                })
                .catch((error) => {
                    console.error(error.message);
                    useToast().error("Error while fetching hostel requests");
                    this.setLoading(false);
                });
        }
    }
});