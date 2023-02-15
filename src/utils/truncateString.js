const truncateString = (str, num) => {
    if (str) {
        if (str.length > num) {
            return `${str.slice(0, num).trimEnd()}...`;
        }
    }

    return str;
}

export default truncateString
