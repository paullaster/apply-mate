class Helper {
    mask(str) {
        if (!str) return '';
        const firstThree = str.substring(0, 3);
        const lastFour = str.substring(-4);
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
}

export default new Helper();