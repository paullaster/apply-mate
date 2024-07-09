import { DateTime } from "luxon"

class DateClass{
    /**
     * 
     * @param {*} date string
     * @returns formdate 
     */
        toDate(date) {
            return DateTime.fromISO(date).toFormat('yyyy LLL dd');
        }
    }

    export default new DateClass();
    