import vars from "../vars"

const filePreviewOrigin = filepath => (`${vars.source}/${filepath}`)

const getUserPhoto = filepath => {
    if (filepath) {
        if (filepath.includes('googleusercontent')) {
            return filepath
        } else {
            return filePreviewOrigin(filepath)
        }
    }

    return null;
}

export default getUserPhoto;
