class Helper {
    mask(str) {
        if (!str) return '';
        const firstThree = str?.slice(0, 2);
        const lastFour = str?.slice(-2);
        return `${firstThree}*****${lastFour}`;
    }
    getStatusValueFilter(routeName) {
        switch (routeName) {
            case 'applications':
                return 'New';
            case 'onboarded':
                return 'Onboarded';
            case 'approved':
                return 'Approved';
            case 'hrreviewed':
                return 'Reviewed';
            default:
                return '';
        }
    }
    setPaginationFilter(paginationFilter = {}) {
        return {
            ...paginationFilter,
        }
    }
    countDown(val) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (val <= 0) {
                    clearInterval(interval);
                    resolve();
                } else {
                    val--;
                }
            }, 1000);
        });
    }
    countDownDisplay(time) {
        return `${Math.floor(time / 60)}:${time % 60 < 10? '0' : ''}${time % 60}`;
    }
}

export default new Helper();