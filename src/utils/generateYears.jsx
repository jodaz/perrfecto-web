const generateYears = () => {
    let max = new Date().getFullYear();
    let min = max - 25;
    let years = [];

    for (let i = max; i >= min; i--) {
        years.push({
            value: i,
            label: i
        });
    }

    return years
}

export default generateYears;
