import { useDashboard } from "@/store";

export const addLink = (link) => {
    const dashboardStore = useDashboard();
    dashboardStore.addLinks(link);
}