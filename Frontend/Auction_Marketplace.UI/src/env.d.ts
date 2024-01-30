
interface ImportMetaEnv {
    readonly VITE_LOGOUT_ENDPOINT: string
    readonly VITE_GOOGLE_LOGIN_ENDPOINT: string
    readonly VITE_LOGIN_ENDPOINT: string
    readonly VITE_REGISTER_ENDPOINT: string
    readonly VITE_BASE_URL: string
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_GET_USER_ENDPOINT: string
    readonly VITE_UPDATE_USER_ENDPOINT: string
    readonly VITE_GET_AUCTIONS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}