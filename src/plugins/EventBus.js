
import { globalEventBus } from "vue-toastification";

globalEventBus.on('sortByCounty', ()=> {
    console.log('Sorting by county...');
})