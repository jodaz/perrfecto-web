import parsePhoneNumber from 'libphonenumber-js'

const formatPhone = user => (
    user.phone ? parsePhoneNumber(`+${user.code_phone}${user.phone}`).formatInternational()
    : 'No tiene'
)

export default formatPhone
