class Helper{
    mask(str) {
        if (!str) return '';
        const firstThree = str.substring(0, 3);
        const lastFour = str.substring(-4);
        return `${firstThree}*****${lastFour}`;
    }
}

export default new Helper();