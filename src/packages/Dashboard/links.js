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
        path: `/${btoa(AuthService.getUser().id)}/requests?queue=requests`,
        order: 2,
        hasSubs: false,
        icon: "mdi-file-multiple",
        title: "Requests",
        id: 'requests',
    },
];