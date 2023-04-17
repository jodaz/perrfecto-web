// Names for localstorage variables

const vars = {
    authToken: `${import.meta.env.VITE_APP_TOKEN}`,
    intro: `${import.meta.env.VITE_APP_INTRODUCTION}`,
    source: `${import.meta.env.VITE_APP_API}`,
    GoogleID: `${import.meta.env.VITE_APP_GG_APP_ID}`,
    user: `${import.meta.env.VITE_APP_USER_INFO}`,
    FacebookID: `${import.meta.env.VITE_APP_FB_APP_ID}`,
    PaypalClientID: `${import.meta.env.VITE_APP_PAYPAL_CLIENT_ID}`,
    StripeClientID: `${import.meta.env.VITE_APP_STRIPE_CLIENT_ID}`
}

export default vars
