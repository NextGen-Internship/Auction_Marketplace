
interface ImportMetaEnv {
    VITE_GOOGLE_LOGIN_ENDPOINT: any
    VITE_LOGIN_ENDPOINT: any
    VITE_REGISTER_ENDPOINT: any
    VITE_BASE_URL: any
    readonly VITE_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}