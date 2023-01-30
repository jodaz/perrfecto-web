const formDataHandler = (data, fieldFileName = 'file') => {
    const formData = new FormData();
    const { files, ...rest } = data;

    if (files) {
        for (let i = 0; i < files.length; i++) {
            if (files[i]) { // ignore undefined or null
                formData.append(fieldFileName, files[i]);
            }
        }
    }

    for (let [key, value] of Object.entries(rest)) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }
        //@ts-expect-error
        formData.append(key, value);
    };

    return formData;
}

export default formDataHandler
