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
        path: `/${btoa(AuthService.getUser().id)}/applications?queue=applications`,
        order: 2,
        hasSubs: false,
        icon: "mdi-file-multiple",
        title: "Applications",
        id: 'applications',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/onboarded?queue=onboarded`,
        order: 3,
        hasSubs: false,
        icon: "mdi-email-seal",
        title: "Onboarded",
        id: 'onboarded',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/approved?queue=approved`,
        order: 4,
        hasSubs: false,
        icon: "mdi-check-decagram",
        title: "Approved",
        id: 'approved',
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/hrreviewed?queue=hrreviewed`,
        order: 5,
        hasSubs: false,
        icon: "mdi-flash-red-eye",
        title: "HR Reviewd",
        id: 'hr_reviewed',
    }
];