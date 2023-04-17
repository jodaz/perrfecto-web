// Names for localstorage variables

const vars = {
    authToken: `${process.env.VITE_APP_TOKEN}`,
    intro: `${process.env.VITE_APP_INTRODUCTION}`,
    source: `${process.env.VITE_APP_API}`,
    GoogleID: `${process.env.VITE_APP_GG_APP_ID}`,
    user: `${process.env.VITE_APP_USER_INFO}`,
    FacebookID: `${process.env.VITE_APP_FB_APP_ID}`,
    PaypalClientID: `${process.env.VITE_APP_PAYPAL_CLIENT_ID}`,
    PaypalSecret: `${process.env.VITE_APP_PAYPAL_SECRET}`,
    StripeClientID: `${process.env.VITE_APP_STRIPE_CLIENT_ID}`,
    StripeSecret: `${process.env.VITE_APP_STRIPE_SECRET}`,
}

export default vars
