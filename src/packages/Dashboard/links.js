import AuthService from "../auth/AuthService";

export default [
    {
        path: `/${btoa(AuthService.getUser().id)}/dashboard`,
        order: 1,
        hasSubs: false,
        icon: "mdi-view-dashboard",
        title: "Dashboard",
    },
    {
        path: `/${btoa(AuthService.getUser().id)}/applications`,
        order: 2,
        hasSubs: false,
        icon: "mdi-file-multiple",
        title: "applications",
    }
];