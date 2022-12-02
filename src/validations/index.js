export const PHONE = {
    rules: {
        required: true,
        pattern: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    },
    messages: {
        required: "Ingrese su teléfono",
        pattern: 'Introduzca un número de teléfono válido'
    }
}

export const BUSINESS_NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese el nombre de su negocio."
    }
}

export const NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese su nombre."
    }
}

export const LAST_NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese su apellido."
    }
}

export const BUSINESS_ADDRESS = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese la dirección su negocio."
    }
}

export const CONFIRM_PASSWORD = {
    rules: {
        required: true,
        minLength: 6
    },
    messages: {
        required: "Repita la contraseña",
        minLength: "Mínimo 6 caracteres",
        validate: "Las contraseñas no coinciden."
    }
}

export const EMAIL = {
    rules: {
        required: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        unique: true
    },
    messages: {
        unique: 'El correo ha sido registrado.',
        required: "Ingrese su correo",
        pattern: "Email inválido"
    }
}

export const PASSWORD = {
    rules: {
        required: true,
        minLength: 6
    },
    messages: {
        required: "Ingrese una contraseña",
        minLength: "Mínimo 6 caracteres"
    }
}

export const DOG_TYPE = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione un tipo de raza.",
    }
}

export const DOG_GENDER = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione el género de su perro.",
    }
}

export const BREED = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione la raza de su perro.",
    }
}

export const DOG_AGE = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione el año de nacimiento.",
    }
}
