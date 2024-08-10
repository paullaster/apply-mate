import AuthService from "../auth/AuthService";

export default [
    {
        path: `/${btoa(AuthService.getUser().id)}/dashboard`,
        order: 1,
        hasSubs: false,
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        id: 'dashboard',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/applications`,
        order: 2,
        hasSubs: false,
        icon: "mdi-file-multiple",
        title: "Applications",
        id: 'applications',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/onboarded`,
        order: 3,
        hasSubs: false,
        icon: "mdi-email-seal",
        title: "Onboarded",
        id: 'onboarded',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/approved`,
        order: 4,
        hasSubs: false,
        icon: "mdi-check-decagram",
        title: "Approved",
        id: 'approved',
    }
];